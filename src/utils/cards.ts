import { Suit, Rank, rankValue, suitValue } from "../types/CardType";
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

  compareTo(other: Card) {
    if (this.suit === other.suit)
      return rankValue[this.rank] - rankValue[other.rank];
    return suitValue[this.suit] - suitValue[other.suit];
  }

  toFirestore() {
    return { suit: this.suit, rank: this.rank };
  }
  static fromFirestore(card: { suit: Suit; rank: Rank }) {
    return new Card(card.suit, card.rank);
  }
}
