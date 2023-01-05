import { useState } from "react";

import { useHttpsCallable } from "react-firebase-hooks/functions";
import usePlayer from "./usePlayer"; // TODO : Change it to import {usePlayer}

import { CardType } from "../types/CardType";

import { Card } from "../utils/cards";
import { functions } from "../utils/firebase";

const useTrick = () => {
  const { me, room } = usePlayer();

  // Check whos turn is it to deal a card.
  const currTurn = room?.gameState?.turn;
  const playerToDeal = room?.biddingPhase?.players.find(
    (plyr) => plyr.position === currTurn
  );

  // Check whether this player can deal a card.
  const myPosition = me?.position as number;
  const leftPosition = (myPosition + 1) % 4;
  const topPosition = (myPosition + 2) % 4;
  const rightPosition = (myPosition + 3) % 4;
  const isMyTurn = currTurn === myPosition;

  // Cards on the table right now.
  //   const tableCards = room?.gameState?.tableCards;
  const tableCards: (CardType | null)[] = [
    new Card("♠", "A").toFirestore(),
    new Card("♠", "A").toFirestore(),
    new Card("♠", "A").toFirestore(),
    new Card("♠", "A").toFirestore(),
  ];
  const leftPlayerTableCard = tableCards[leftPosition];
  const topPlayerTableCard = tableCards[topPosition];
  const rightPlayerTableCard = tableCards[rightPosition];
  const bottomPlayerTableCard = tableCards[myPosition]; // The card this player has dealt

  // Mark the player's selected card before they deal it.
  const [selectedCardInstance, setSelectedCardInstance] = useState<Card | null>(
    null
  );
  const handleSelectCard =
    (card: Card) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedCardInstance(card);
    };

  // Deal a card onto the table.
  const [dealCard] = useHttpsCallable<CardType, void>(functions, "dealCard");
  const handleDeal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const selectedCard = selectedCardInstance?.toFirestore();
    selectedCard && dealCard(selectedCard);
  };

  return {
    tableCards,
    leftPlayerTableCard,
    topPlayerTableCard,
    rightPlayerTableCard,
    bottomPlayerTableCard,

    isMyTurn,
    playerToDeal,
    handleSelectCard,
    handleDeal,
  };
};

export default useTrick;
