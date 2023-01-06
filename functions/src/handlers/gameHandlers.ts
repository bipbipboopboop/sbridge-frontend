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

import { Trick } from "../utils/tricks";
import { Card } from "../utils/cards";

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

    const declarerTeamMembers = room.playersUID.filter((uid) =>
      [player.uid, teammate?.playerUID].includes(uid)
    );

    const defendingTeamMembers = room.playersUID.filter(
      (uid) => ![player.uid, teammate?.playerUID].includes(uid)
    );

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
      players: room.biddingPhase?.players as SimpleRoomPlayer[],
      trumpSuit: room.biddingPhase?.currHighestBid?.suit as Suit,
      declarerTeam,
      defendingTeam,
      winnerTeam: null,
      tableCards: [null, null, null, null],
      firstTableCard: null,
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

export const dealCard = functions.https.onCall(
  async (card: CardType, context) => {
    const { player, room, roomRef } = await checkPlayerAccessPrivilege(context);
    const [roomPlayerRef, roomPlayer] = await getDocRefAndData<RoomPlayer>(
      `rooms/${roomRef.id}/roomPlayers/${player.uid}`
    );

    const gameState = room?.gameState as GameState;

    // Check if the game is in Trick Taking stage
    const isTakingTricksState = room.gameStatus === "Taking Tricks";
    if (!isTakingTricksState)
      throw HTTPError("failed-precondition", "You cannot deal in this stage");

    // Check if it's this player's turn to deal card
    const playerPosition = gameState.players.find(
      (plyr) => plyr.playerUID === player.uid
    )?.position;

    const isPlayerTurn = gameState.turn === playerPosition;

    if (!isPlayerTurn)
      throw HTTPError("failed-precondition", "It's not your turn yet!");

    // Check if this player has dealt a card before or not
    const cardDealtByPlayer = gameState.tableCards.at(playerPosition);
    if (cardDealtByPlayer)
      throw HTTPError("already-exists", "You've already dealt a card before!");

    // Check if the player cheated by not playing firstCard.suit when they have cards of firstCard.suit
    const numCardsOnTable = gameState.tableCards.filter(
      (card) => card !== null
    ).length;

    const isFirstToPlay = numCardsOnTable === 0;
    const isPlayerWithholdingCard =
      (roomPlayer?.cardsOnHand?.filter(
        (card) => card.suit === gameState.firstTableCard?.suit
      ).length as number) > 0;
    const isDealtCardSuitEqualFirstCardSuit =
      card.suit === gameState.firstTableCard?.suit;
    const isPlayerCheatingSuit =
      !isDealtCardSuitEqualFirstCardSuit && isPlayerWithholdingCard;

    const isValidDeal = isFirstToPlay || !isPlayerCheatingSuit;

    if (!isValidDeal)
      throw HTTPError(
        "permission-denied",
        `You still have ${gameState.firstTableCard?.suit}s and must deal it in this trick`
      );

    // If reach here, player has passed all checks and can deal a card
    const updatedRoomPlayer: RoomPlayer = produce(
      roomPlayer as RoomPlayer,
      (roomPlayer) => {
        roomPlayer.cardsOnHand = (roomPlayer.cardsOnHand as Card[]).filter(
          (handCard) =>
            !(handCard.rank === card.rank && handCard.suit === card.suit)
        ) as CardType[];
      }
    );
    await roomPlayerRef.update(updatedRoomPlayer);

    const updatedGameState: GameState = produce(gameState, (gameState) => {
      // Decrease the number of card this player has
      gameState.players[playerPosition].numCardsOnHand--;
      // Deal card onto the table
      gameState.tableCards[playerPosition] = card;

      // Check whether the player is the first or last to deal.
      // Check if player is the last to deal. If so, determine winner
      const isLastToPlay = numCardsOnTable === 3;
      // Immer uses the original state so tableCards hasn't been updated at this point.
      if (isLastToPlay) {
        // Determine winner
        const trick = new Trick(
          gameState.firstTableCard as CardType,
          gameState.tableCards,
          gameState.trumpSuit
        );
        const winnerPos = trick.getWinnerPos();
        const winner = gameState.players[winnerPos];
        const trickWonTeam = gameState.declarerTeam.members.includes(
          winner.playerUID
        )
          ? gameState.declarerTeam
          : gameState.defendingTeam;

        const isTrickWonByDeclarerTeam = trickWonTeam.teamTricksNeeded >= 7;

        if (isTrickWonByDeclarerTeam) {
          gameState.declarerTeam = trickWonTeam;
        } else {
          gameState.defendingTeam = trickWonTeam;
        }
        gameState.turn = winnerPos;
        gameState.startingPosition = winnerPos;
      }

      if (isFirstToPlay) {
        gameState.firstTableCard = card;
      }
      gameState.turn = (gameState.turn + 1) % 4;
    });

    await roomRef.update(updatedGameState);
  }
);
