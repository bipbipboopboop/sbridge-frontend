import { BidType, PastBid } from "../utils/bids";
import { SimplePlayer, SimpleRoomPlayer } from "./PlayerType";

export type GameState = {
  trumpSuit: string;
  declarerTeam: {
    teamTricksNeeded: number | null;
    teamTricksWon: number;
    members: SimpleRoomPlayer[];
  };
  defendingTeam: {
    teamTricksNeeded: number | null;
    teamTricksWon: number;
    members: SimpleRoomPlayer[];
  };
  winnerTeam: string | null;
  turn: number; // An integer to determine which player's turn to play
};

export type BiddingState = {
  turn: number;
  players: SimpleRoomPlayer[];
  currHighestBid: BidType | null;
  currHighestBidder: SimplePlayer | null;
  pastBids: PastBid[];
  numConsecutivePasses: number;
};
