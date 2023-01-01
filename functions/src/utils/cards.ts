const CARDS_ARRAY: { suit: Suit; rank: Rank }[] = [
  {
    suit: "♥",
    rank: 2,
  },
  {
    suit: "♥",
    rank: 3,
  },
  {
    suit: "♥",
    rank: 4,
  },
  {
    suit: "♥",
    rank: 5,
  },
  {
    suit: "♥",
    rank: 6,
  },
  {
    suit: "♥",
    rank: 7,
  },
  {
    suit: "♥",
    rank: 8,
  },
  {
    suit: "♥",
    rank: 9,
  },
  {
    suit: "♥",
    rank: 10,
  },
  {
    suit: "♥",
    rank: "J",
  },
  {
    suit: "♥",
    rank: "Q",
  },
  {
    suit: "♥",
    rank: "K",
  },
  {
    suit: "♥",
    rank: "A",
  },
  {
    suit: "♦",
    rank: 2,
  },
  {
    suit: "♦",
    rank: 3,
  },
  {
    suit: "♦",
    rank: 4,
  },
  {
    suit: "♦",
    rank: 5,
  },
  {
    suit: "♦",
    rank: 6,
  },
  {
    suit: "♦",
    rank: 7,
  },
  {
    suit: "♦",
    rank: 8,
  },
  {
    suit: "♦",
    rank: 9,
  },
  {
    suit: "♦",
    rank: 10,
  },
  {
    suit: "♦",
    rank: "J",
  },
  {
    suit: "♦",
    rank: "Q",
  },
  {
    suit: "♦",
    rank: "K",
  },
  {
    suit: "♦",
    rank: "A",
  },
  {
    suit: "♣",
    rank: 2,
  },
  {
    suit: "♣",
    rank: 3,
  },
  {
    suit: "♣",
    rank: 4,
  },
  {
    suit: "♣",
    rank: 5,
  },
  {
    suit: "♣",
    rank: 6,
  },
  {
    suit: "♣",
    rank: 7,
  },
  {
    suit: "♣",
    rank: 8,
  },
  {
    suit: "♣",
    rank: 9,
  },
  {
    suit: "♣",
    rank: 10,
  },
  {
    suit: "♣",
    rank: "J",
  },
  {
    suit: "♣",
    rank: "Q",
  },
  {
    suit: "♣",
    rank: "K",
  },
  {
    suit: "♣",
    rank: "A",
  },
  {
    suit: "♠",
    rank: 2,
  },
  {
    suit: "♠",
    rank: 3,
  },
  {
    suit: "♠",
    rank: 4,
  },
  {
    suit: "♠",
    rank: 5,
  },
  {
    suit: "♠",
    rank: 6,
  },
  {
    suit: "♠",
    rank: 7,
  },
  {
    suit: "♠",
    rank: 8,
  },
  {
    suit: "♠",
    rank: 9,
  },
  {
    suit: "♠",
    rank: 10,
  },
  {
    suit: "♠",
    rank: "J",
  },
  {
    suit: "♠",
    rank: "Q",
  },
  {
    suit: "♠",
    rank: "K",
  },
  {
    suit: "♠",
    rank: "A",
  },
];

const suitValue = {
  "♣": 1,
  "♦": 2,
  "♥": 3,
  "♠": 4,
} as const;
type Suit = keyof typeof suitValue;

const rankValue = {
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
type Rank = keyof typeof rankValue;

export class Card {
  suit: Suit;
  rank: Rank;
  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
  toString() {
    return `${this.rank} of ${this.suit}`;
  }
  rankValue() {
    return rankValue[this.rank];
  }

  toFirestore() {
    return { suit: this.suit, rank: this.rank };
  }
  static fromFirestore(card: { suit: Suit; rank: Rank }) {
    return new Card(card.suit, card.rank);
  }
}

export type CardType = {
  suit: Suit;
  rank: Rank;
};

export class Deck {
  cards: Card[];
  constructor() {
    this.cards = CARDS_ARRAY.map((card) => new Card(card.suit, card.rank));
  }

  shuffle() {
    const { cards } = this;
    let m = cards.length,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [cards[m], cards[i]] = [cards[i], cards[m]];
    }
    return this;
  }
}
