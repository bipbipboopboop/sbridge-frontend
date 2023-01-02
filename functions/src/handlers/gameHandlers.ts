import * as functions from "firebase-functions";
import { Suit } from "../types/CardType";
import { BiddingState } from "../types/GameType";
import { Bid, BidType } from "../utils/bids";
import { checkPlayerAccessPrivilege } from "../utils/player_utils";
import { HTTPError } from "../utils/utils";

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

  const checkedBid = new Bid(bid.suit, bid.value, bid.isPass);

  // If the incoming bid is a pass. Update the players turn and numConsecutivePasses then return immediately
  if (checkedBid.isPass) {
    const updatedBiddingPhase: BiddingState = {
      players: biddingPhase.players,
      turn: (biddingPhase.turn + 1) % 4,
      currHighestBid: biddingPhase.currHighestBid,
      numConsecutivePasses: biddingPhase.numConsecutivePasses + 1,
    };

    await roomRef.update({ biddingPhase: updatedBiddingPhase });
    return;
  }

  // If the currHighestBid is null, it means it's the start of the game. Any bid should pass through

  // Else,
  // Check if bid is larger than currHighestBid
  const currHighestBid = new Bid(
    biddingPhase.currHighestBid?.suit as Suit,
    biddingPhase.currHighestBid?.value as number,
    biddingPhase.currHighestBid?.isPass as boolean
  );

  const isOutBiddable = checkedBid.canOutbid(currHighestBid);
  if (!isOutBiddable)
    throw HTTPError("failed-precondition", "Your bid is too small!");

  const newHighestBid = checkedBid.toBidType();

  const updatedBiddingPhase: BiddingState = {
    players: biddingPhase.players,
    turn: (biddingPhase.turn + 1) % 4,
    currHighestBid: newHighestBid,
    numConsecutivePasses: 0,
  };

  await roomRef.update({ biddingPhase: updatedBiddingPhase });
});
