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
  const playerToDeal = room?.gameState?.players.find(
    (plyr) => plyr.position === currTurn
  );

  // Check whether this player can deal a card.
  const myPosition = me?.position as number;
  const leftPosition = (myPosition + 1) % 4;
  const topPosition = (myPosition + 2) % 4;
  const rightPosition = (myPosition + 3) % 4;
  const isMyTurn = currTurn === myPosition;

  // Cards on the table right now.
  const tableCards = (room?.gameState?.tableCards as CardType[]) || [];

  const leftPlayerTableCard = tableCards[leftPosition];
  const topPlayerTableCard = tableCards[topPosition];
  const rightPlayerTableCard = tableCards[rightPosition];
  const bottomPlayerTableCard = tableCards[myPosition]; // The card this player has dealt

  const startingPos = room?.gameState?.startingPosition as number;

  const leftOffset = (leftPosition + 4 - startingPos) % 4;
  const topOffset = (topPosition + 4 - startingPos) % 4;
  const rightOffset = (rightPosition + 4 - startingPos) % 4;
  const bottomOffset = (myPosition + 4 - startingPos) % 4;

  // Mark the player's selected card before they deal it.
  const [selectedCard, setSelectedCard] = useState<CardType | null>(
    new Card("♠", "K")
  );

  const handleSelectCard =
    (card: Card) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      console.log({ card });
      setSelectedCard(card.toFirestore());
    };

  // Deal a card onto the table.
  const [dealCard] = useHttpsCallable<CardType, void>(functions, "dealCard");
  const handleDeal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    selectedCard && dealCard(selectedCard);
  };

  return {
    // For displaying card on table
    tableCards,
    leftPlayerTableCard,
    topPlayerTableCard,
    rightPlayerTableCard,
    bottomPlayerTableCard,

    // For calculating z-index
    leftOffset,
    topOffset,
    rightOffset,
    bottomOffset,

    // For declaring on prompt
    playerToDeal,
    selectedCard,

    isMyTurn,
    handleSelectCard,
    handleDeal,
  };
};

export default useTrick;
