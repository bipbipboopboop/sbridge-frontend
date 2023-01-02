export type Player = {
  uid: string; // player's uid
  playerName: string; // player's name
  roomID: string; // default : publicLobby
  // https://stackoverflow.com/questions/70861528/firebase-9-with-react-typescript-how-do-i-change-the-querysnapshot-types
};

// For room docs : room.players
export type SimplePlayer = {
  playerName: string;
  playerUID: string;
};

// For room.biddingPhase and room.gamePhase
export type SimpleRoomPlayer = {
  playerName: string;
  playerUID: string;
  numTricksWon: number;
  position: number;
  numCardsOnHand: number;
};

export type RoomPlayer = {
  playerUID: string;
  playerName: string;
  isReady: boolean;

  position: number | null;
  cardsOnHand: CardType[] | null;

  numTricksWon: number;
  tricksWon: CardType[][] | null;
};

export const suitValue = {
  "♣": 1,
  "♦": 2,
  "♥": 3,
  "♠": 4,
} as const;
export type Suit = keyof typeof suitValue;

export const rankValue = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
} as const;
export type Rank = keyof typeof rankValue;

type CardType = {
  suit: Suit;
  rank: Rank;
};
