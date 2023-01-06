import { CardType } from "../types/CardType";
import { Suit } from "./bids";
import { Card } from "./cards";

export class Trick {
  firstCard: Card;
  tableCards: (Card | null)[];
  trumpSuit: Suit;

  constructor(
    firstCard: CardType,
    tableCards: (CardType | null)[],
    trumpSuit: Suit | "NT"
  ) {
    this.firstCard = new Card(firstCard.suit, firstCard.rank);
    this.tableCards = tableCards.map(
      (card) => card && new Card(card?.suit, card?.rank)
    );
    this.trumpSuit = trumpSuit;
  }

  //   private isFirstCard(card: Card) {
  //     return (
  //       card.suit === this.firstCard.suit && card.rank === this.firstCard.rank
  //     );
  //   }

  //   private compareCard(cardA: Card, cardB: Card) {
  //     if (cardA.suit === this.trumpSuit && cardB.suit !== this.trumpSuit)
  //       return 1;
  //     if (cardA.suit !== this.trumpSuit && cardB.suit == this.trumpSuit)
  //       return -1;

  //   }

  getWinnerPos() {
    const maxTrumpCard = (this.tableCards as Card[])
      .filter((tableCard) => tableCard.suit === this.trumpSuit)
      .sort((cardA, cardB) => cardA.compareTo(cardB))
      .at(-1);

    const maxRelevantCard = (this.tableCards as Card[])
      .filter((tableCard) => tableCard.suit === this.firstCard.suit)
      .sort((cardA, cardB) => cardA.compareTo(cardB))
      .at(-1) as Card;

    const maxCard = maxTrumpCard || maxRelevantCard;
    return this.tableCards.findIndex((card) => card?.equals(maxCard));
  }
}
