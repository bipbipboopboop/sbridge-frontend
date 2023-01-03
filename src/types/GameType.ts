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
};

const suitValue = {
  "♣": 1,
  "♦": 2,
  "♥": 3,
  "♠": 4,
  NT: 5,
} as const;
type Suit = keyof typeof suitValue;

type BidType = {
  suit: Suit;
  value: number;
  isPass: boolean;
};
