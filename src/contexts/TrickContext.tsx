import { createContext, ReactNode } from "react";

import useTrick from "../hooks/useTrick";
import { CardType } from "../types/CardType";
import { SimpleRoomPlayer } from "../types/PlayerType";
import { Card } from "../utils/cards";

type TrickProps = {
  tableCards: (CardType | null)[];
  leftPlayerTableCard: CardType | null;
  topPlayerTableCard: CardType | null;
  rightPlayerTableCard: CardType | null;
  bottomPlayerTableCard: CardType | null;

  // For calculating z-index
  leftOffset: number;
  topOffset: number;
  rightOffset: number;
  bottomOffset: number;

  // For declaring on prompt
  playerToDeal: SimpleRoomPlayer | undefined;
  selectedCard: CardType | null;

  isMyTurn: boolean;
  handleSelectCard: (card: Card) => (e: React.MouseEvent<HTMLElement>) => void;
  handleDeal: (e: React.MouseEvent<HTMLElement>) => void;
};

const defaultTrick = {
  tableCards: [null, null, null, null],
  leftPlayerTableCard: null,
  topPlayerTableCard: null,
  rightPlayerTableCard: null,
  bottomPlayerTableCard: null,

  // For calculating z-index
  leftOffset: 0,
  topOffset: 0,
  rightOffset: 0,
  bottomOffset: 0,

  // For declaring on prompt
  playerToDeal: undefined,
  selectedCard: null,

  isMyTurn: false,
  handleSelectCard: (card: Card) => (e: React.MouseEvent<HTMLElement>) => {},
  handleDeal: (e: React.MouseEvent<HTMLElement>) => {},
};

export const TrickContext = createContext<TrickProps>(defaultTrick);

export const TrickProvider = (props: { children: ReactNode }) => {
  const trick = useTrick();
  return (
    <TrickContext.Provider value={trick}>
      {props.children}
    </TrickContext.Provider>
  );
};
