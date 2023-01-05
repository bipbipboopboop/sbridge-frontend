import { BidType, PastBid } from "../utils/bids";
import { SimplePlayer, SimpleRoomPlayer } from "./PlayerType";

export type GameState = {
  trumpSuit: string;
  declarerTeam: Team;
  defendingTeam: Team;
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

export type Team = {
  teamTricksNeeded: number;
  teamTricksWon: number;
  members: SimpleRoomPlayer[];
};
