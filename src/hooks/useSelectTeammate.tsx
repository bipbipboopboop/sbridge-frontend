import { doc, DocumentReference } from "firebase/firestore";
import { useState } from "react";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { Suit } from "../types/CardType";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";

import { Card, Deck } from "../utils/cards";
import { firestore } from "../utils/firebase";
import usePlayer from "./usePlayer";

const useSelectTeammate = () => {
  const { playerData } = usePlayer();
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

  const [selectedSuit, setSelectedSuit] = useState<Suit | "">("");

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
  console.log({ bidWinner });

  return { selectableCards, isBidWinner, handleSelectSuit, bidWinner };
};

export default useSelectTeammate;
