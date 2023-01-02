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

export type CardType = {
  suit: Suit;
  rank: Rank;
};
