const suitValue = {
  "♣": 1,
  "♦": 2,
  "♥": 3,
  "♠": 4,
  NT: 5,
} as const;
type Suit = keyof typeof suitValue;

export class Bid {
  suit: Suit;
  value: number;
  constructor(suit: Suit, value: number) {
    this.suit = suit;
    this.value = value;
  }

  /**
   *
   * @param other
   * @returns A positive number if this bid is larger and negative if the bid is larger.
   */
  compareTo(other: Bid) {
    if (this.suit === other.suit) {
      return this.value - other.value;
    } else {
      return suitValue[this.suit] - suitValue[other.suit];
    }
  }

  /**
   *
   * @param other
   * @returns Returns a `true` if this bid is larger than `other` bid.
   */
  canOutbid(other: Bid) {
    return this.compareTo(other) > 0;
  }
}
