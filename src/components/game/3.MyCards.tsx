import useTrick from "../../hooks/useTrick";
import { RoomPlayer } from "../../types/PlayerType";
import { Card } from "../../utils/cards";
import PlayingCard from "../PlayingCard";

type MyCardsProps = {
  me: RoomPlayer;
};

const MyCards = (props: MyCardsProps) => {
  const { me } = props;
  const { handleSelectCard } = useTrick();

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
          <div
            key={index}
            style={{
              marginLeft: index === 0 ? "0" : "-2.2em",
              cursor: "pointer",
            }}
            onClick={handleSelectCard(card)}
          >
            <PlayingCard card={card} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCards;
