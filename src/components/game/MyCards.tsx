import { RoomPlayer } from "../../types/PlayerType";
import { Card } from "../../utils/cards";
import PlayingCard from "../PlayingCard";

type MyCardsProps = {
  me: RoomPlayer;
};

const MyCards = (props: MyCardsProps) => {
  const { me } = props;

  const sortedCards =
    me &&
    me.cardsOnHand
      ?.map((card) => {
        return new Card(card.suit, card.rank);
      })
      .sort((cardA, cardB) => cardA.compareTo(cardB));

  return (
    <>
      <p>You</p>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ maxWidth: "100%", overflowX: "scroll" }}
      >
        {sortedCards?.map((card, index) => (
          <PlayingCard key={index} card={card} />
        ))}
      </div>
    </>
  );
};

export default MyCards;
