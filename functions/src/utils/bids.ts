const suitValue = {
  "♣": 1,
  "♦": 2,
  "♥": 3,
  "♠": 4,
  NT: 5,
} as const;
export type Suit = keyof typeof suitValue;

export class Bid {
  suit: Suit;
  value: number;
  isPass: boolean;
  constructor(suit: Suit, value: number, isPass: boolean) {
    this.suit = suit;
    this.value = value;
    this.isPass = isPass;
  }

  /**
   *
   * @param other
   * @returns A positive number if this bid is larger and negative if the bid is larger.
   */
  compareTo(other: Bid) {
    if (this.value === other.value) {
      return suitValue[this.suit] - suitValue[other.suit];
    } else {
      return this.value - other.value;
    }
  }

  /**
   *
   * @param other
   * @returns Returns a `true` if this bid is larger than `other` bid.
   */
  canOutbid(other: Bid | null) {
    if (!other || other.isPass) return true;
    return this.compareTo(other) > 0;
  }

  static isBid(object: any) {
    const objectSuit = object?.suit;
    const objectValue = object?.value;
    const isSuitValid = ["♣", "♦", "♥", "♠", "NT"].indexOf(objectSuit) !== -1;
    const isValueCorrect = [1, 2, 3, 4, 5, 6].indexOf(objectValue) !== -1;

    return isSuitValid && isValueCorrect;
  }

  toBidType(): BidType {
    return {
      suit: this.suit,
      value: this.value,
      isPass: this.isPass,
    };
  }
}

export type BidType = {
  suit: Suit;
  value: number;
  isPass: boolean;
};
