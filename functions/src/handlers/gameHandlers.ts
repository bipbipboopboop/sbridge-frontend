import * as functions from "firebase-functions";

import { DocumentReference } from "firebase-admin/firestore";

import { checkPlayerAccessPrivilege } from "../utils/player_utils";
import { getDocRefAndData, HTTPError } from "../utils/utils";
import { Bid, BidType } from "../utils/bids";
import { updatePastBids } from "../utils/game_utils";

import { Room } from "../types/RoomType";
import { BiddingState, GameState, Team } from "../types/GameType";
import { CardType, Suit } from "../types/CardType";
import {
  RoomPlayer,
  SimplePlayer,
  SimpleRoomPlayer,
} from "../types/PlayerType";

import produce from "immer";

export const castBid = functions.https.onCall(async (bid: BidType, context) => {
  if (!context.auth)
    throw HTTPError("failed-precondition", "This player is not authenticated!");

  // Check whether the player is in the room
  const { roomRef, room } = await checkPlayerAccessPrivilege(context); // TODO : Change function name to checkIsPlayerInRoom

  // Check if the game is in bidding stage
  const isBiddingPhase = room.gameStatus === "Bidding";
  if (!isBiddingPhase)
    throw HTTPError("failed-precondition", "The game is not in bidding phase!");
  const biddingPhase = room.biddingPhase as BiddingState;

  // Check if it's the player's turn to bid.
  const isPlayerTurn =
    biddingPhase.turn ===
    biddingPhase.players.find((plyr) => plyr.playerUID === context.auth?.uid)
      ?.position;

  if (!isPlayerTurn)
    throw HTTPError("failed-precondition", "It's not your turn yet!");

  // Check if incoming bid is valid
  const isBidValid = Bid.isBid(bid);
  if (!isBidValid) throw HTTPError("failed-precondition", "Bid is not valid!");

  const bidInstance = new Bid(bid);

  // If the incoming bid is a pass.
  if (bidInstance.isPass()) {
    const isBidJustStarted = !biddingPhase.currHighestBid;

    // If the bid just started(First round of bidding) and 3 persons already passed.
    // This player's pass will make it a 4 consecutive pass and the game resets.
    const allPlayersPassAtStart =
      biddingPhase.numConsecutivePasses === 3 && isBidJustStarted;

    if (allPlayersPassAtStart) {
      // resetBid()
      return;
    }

    // If there are already 2 consecutive passes and this player also passes.
    // There will be 3 consecutive passes, the game begins.
    const isThreeConsecutivePass =
      biddingPhase.currHighestBid && biddingPhase.numConsecutivePasses === 2;

    if (isThreeConsecutivePass) {
      await startGame(roomRef, room, context);
      return;
    }

    // Else, it's a normal pass.
    // Update the players turn and numConsecutivePasses then return immediately
    const updatedBiddingPhase: BiddingState = {
      turn: (biddingPhase.turn + 1) % 4,
      players: biddingPhase.players,
      currHighestBid: biddingPhase.currHighestBid,
      currHighestBidder: biddingPhase.currHighestBidder,
      pastBids: updatePastBids(biddingPhase, bidInstance, context),
      numConsecutivePasses: biddingPhase.numConsecutivePasses + 1,
    };

    await roomRef.update({ biddingPhase: updatedBiddingPhase });
    return;
  }

  // Check if bid is larger than currHighestBid
  const currHighestBid = new Bid(biddingPhase.currHighestBid);

  const isOutBiddable = bidInstance.canOutbid(currHighestBid);
  if (!isOutBiddable)
    throw HTTPError("failed-precondition", "Your bid is too small!");

  const newHighestBid = bidInstance.toBidType();

  const updatedBiddingPhase: BiddingState = {
    turn: (biddingPhase.turn + 1) % 4,
    players: biddingPhase.players,
    currHighestBid: newHighestBid,
    currHighestBidder: room.players.find(
      (plyr) => plyr.playerUID === context.auth?.uid
    ) as SimplePlayer,
    pastBids: updatePastBids(biddingPhase, bidInstance, context),
    numConsecutivePasses: 0,
  };

  await roomRef.update({ biddingPhase: updatedBiddingPhase });
});

const startGame = async (
  roomRef: DocumentReference<Room>,
  room: Room,
  context: functions.https.CallableContext
) => {
  const updatedRoom = produce(room, (room) => {
    room.gameStatus = "Choosing Teammate";

    room.biddingPhase = room.biddingPhase as BiddingState;
    room.biddingPhase.numConsecutivePasses++;
    room.biddingPhase.pastBids = updatePastBids(
      room.biddingPhase,
      new Bid(null),
      context
    );
    room.biddingPhase.turn = (room.biddingPhase.turn + 1) % 4;
  });

  await roomRef.update(updatedRoom);
};

export const selectTeammate = functions.https.onCall(
  async (card: CardType, context) => {
    const { player, room, roomRef } = await checkPlayerAccessPrivilege(context);

    const roomPlayer = (
      await getDocRefAndData<RoomPlayer>(
        `rooms/${roomRef.id}/roomPlayers/${player.uid}`
      )
    )[1];

    const isChoosingTeammateState = room.gameStatus === "Choosing Teammate";
    if (!isChoosingTeammateState)
      throw HTTPError(
        "failed-precondition",
        `The game status is currently ${room.gameStatus}`
      );

    const isPlayerBidWinner = room.biddingPhase?.turn === roomPlayer?.position;

    if (!isPlayerBidWinner)
      throw HTTPError(
        "failed-precondition",
        `You do not have the permission to choose your teammate`
      );

    // Check whether the bid winner has picked a card that they own.
    // The bid winner can only pick a card that they don't own(otherwise, they'd be calling themselves as their teammates)
    const isTargetValid =
      (roomPlayer?.cardsOnHand?.filter(
        (cardOnHand) =>
          cardOnHand.rank === card.rank && cardOnHand.suit === card.suit
      )?.length as number) === 0;

    if (!isTargetValid)
      throw HTTPError("failed-precondition", "You cannot pick your own card!");

    const teammate = await getTeammate(room, roomRef, card);

    const declarerTeamMembers = room.biddingPhase?.players.filter((plyr) =>
      [player.uid, teammate?.playerUID].includes(plyr.playerUID)
    ) as SimpleRoomPlayer[];

    const defendingTeamMembers = room.biddingPhase?.players.filter(
      (plyr) => ![player.uid, teammate?.playerUID].includes(plyr.playerUID)
    ) as SimpleRoomPlayer[];

    const declarerTeam: Team = {
      members: declarerTeamMembers,
      teamTricksNeeded:
        (room.biddingPhase?.currHighestBid?.value as number) + 6,
      teamTricksWon: 0,
    };

    const defendingTeam: Team = {
      members: defendingTeamMembers,
      teamTricksNeeded: 13 - declarerTeam.teamTricksNeeded,
      teamTricksWon: 0,
    };

    const gameState: GameState = {
      turn: ((roomPlayer?.position as number) + 1) % 4, // The person next to Bid Winner should start the game.
      startingPosition: ((roomPlayer?.position as number) + 1) % 4,
      trumpSuit: room.biddingPhase?.currHighestBid?.suit as Suit,
      declarerTeam,
      defendingTeam,
      winnerTeam: null,
      tableCards: [null, null, null, null],
    };
    const updatedRoom = produce(room, (room) => {
      // room.biddingPhase = null; // TODO: Check frontend to see if we should make this null
      room.gameState = gameState;
      room.gameStatus = "Taking Tricks";
    });

    roomRef.update(updatedRoom);
  }
);

const getTeammate = async (
  room: Room,
  roomRef: DocumentReference<Room>,
  card: CardType
) => {
  for (const index in room.playersUID) {
    const uid = room.playersUID[index];
    const roomPlayer = (
      await getDocRefAndData<RoomPlayer>(
        `rooms/${roomRef.id}/roomPlayers/${uid}`
      )
    )[1];

    const isPlayerOwnerOfCard =
      (roomPlayer?.cardsOnHand?.filter(
        (handCard) => handCard.rank === card.rank && handCard.suit === card.suit
      ).length as number) > 0;

    if (isPlayerOwnerOfCard) {
      return roomPlayer;
    }
  }
  return null;
};
