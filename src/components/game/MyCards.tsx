import { RoomPlayer } from "../../types/PlayerType";
import { Card } from "../../utils/cards";
import PlayingCard from "../PlayingCard";

type MyCardsProps = {
  roomPlayer: RoomPlayer;
};

const MyCards = (props: MyCardsProps) => {
  const { roomPlayer } = props;

  const sortedCards =
    roomPlayer &&
    roomPlayer.cardsOnHand
      ?.map((card) => {
        return new Card(card.suit, card.rank);
      })
      .sort((cardA, cardB) => cardA.compareTo(cardB));

  return (
    <>
      {sortedCards?.map((card, index) => (
        <PlayingCard key={index} card={card} />
      ))}
    </>
  );
};

export default MyCards;
