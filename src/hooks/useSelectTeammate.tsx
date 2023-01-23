import { doc, DocumentReference } from "firebase/firestore";
import { useState } from "react";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { CardType, Suit } from "../types/CardType";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";

import { Card, Deck } from "../utils/cards";
import { firestore, functions } from "../utils/firebase";
import usePlayer from "./usePlayer";

/**
 * Hook for handling select teammate in the bidding phase
 * @returns
 */
const useSelectTeammate = () => {
  const { playerData } = usePlayer();
  const [selectedSuit, setSelectedSuit] = useState<Suit | "">("");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const roomPlayerRef =
    playerData &&
    (doc(
      firestore,
      `rooms/${playerData?.roomID}/roomPlayers/${playerData?.uid}`
    ) as DocumentReference<RoomPlayer>);

  const roomRef =
    playerData &&
    (doc(firestore, `rooms/${playerData?.roomID}`) as DocumentReference<Room>);
  const [room] = useDocumentData<Room>(roomRef);

  const [me] = useDocumentData<RoomPlayer>(roomPlayerRef);

  const deck = new Deck();
  const isMyCard = (card: Card) =>
    (me?.cardsOnHand?.filter((myCard) =>
      new Card(myCard.suit, myCard.rank).equals(card)
    ).length as number) > 0;
  const selectableCards = deck.cards.filter(
    (card) => !isMyCard(card) && card.suit === selectedSuit
  );

  const isBidWinner = me?.position === room?.biddingPhase?.turn;
  const handleSelectSuit =
    (suit: Suit) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedSuit(suit);
    };

  const bidWinner = room?.biddingPhase?.currHighestBidder;

  const handleSelectCard =
    (card: Card) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedCard(card);
    };

  const [selectTeammate] = useHttpsCallable<CardType, void>(
    functions,
    "selectTeammate"
  );
  const handleSelectTeammate = async () => {
    await selectTeammate(selectedCard?.toFirestore());
  };

  return {
    selectableCards,
    isBidWinner,
    bidWinner,

    handleSelectSuit,
    handleSelectCard,
    handleSelectTeammate,

    selectedCard,
  };
};

export default useSelectTeammate;
