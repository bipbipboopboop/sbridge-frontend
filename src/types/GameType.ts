import { BidType } from "../utils/bids";
import { SimpleRoomPlayer } from "./PlayerType";

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
  currHighestBid: BidType | null;
  players: SimpleRoomPlayer[];
  turn: number;
  numConsecutivePasses: number;
};
