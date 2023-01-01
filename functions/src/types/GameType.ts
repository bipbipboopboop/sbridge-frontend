import { Bid } from "../utils/bids";
import { CardType } from "../utils/cards";

// For GamePlayer sub-collection
export type GamePlayer = {
  playerName: string;
  playerUID: string;
  cardsOnHand: CardType[];
  tricksWon: CardType[][];
  numTricksWon: number;
  position: number;
};

// For GameState
export type SimpleGamePlayer = {
  playerName: string;
  playerUID: string;
  numTricksWon: number;
  position: number;
};

export type GameState = {
  trumpSuit: string;
  declarerTeam: {
    teamTricksNeeded: number;
    teamTricksWon: number;
    members: SimpleGamePlayer[];
  };
  defendingTeam: {
    teamTricksNeeded: number;
    teamTricksWon: number;
    members: SimpleGamePlayer[];
  };
  winnerTeam: string | null;
  turn: number; // An integer to determine which player's turn to play
};

export type BiddingPhase = {
  currHighestBid: Bid | null;
  players: SimpleGamePlayer[];
  turn: number;
};
