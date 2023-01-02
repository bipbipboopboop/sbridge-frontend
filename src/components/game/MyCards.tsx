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
      <div
        className="d-flex flex-wrap justify-content-center"
        // style={{ maxWidth: "100%", overflowX: "scroll" }}
      >
        {sortedCards?.map((card, index) => (
          <div style={{ marginLeft: index === 0 ? "0" : "-2.2em" }}>
            <PlayingCard key={index} card={card} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCards;
