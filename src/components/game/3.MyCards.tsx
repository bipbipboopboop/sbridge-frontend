import { useContext } from "react";
import { TrickContext } from "../../contexts/TrickContext";
import usePlayer from "../../hooks/usePlayer";

import { Card } from "../../utils/cards";
import PlayingCard from "../PlayingCard";

// type MyCardsProps = {
//   me: RoomPlayer;
// };

const MyCards = () => {
  const { me } = usePlayer();
  const trick = useContext(TrickContext);
  const { handleSelectCard } = trick;

  // const first = useContext(TrickContext);

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
            // onMouseOver={() => console.log({ card })}
          >
            <PlayingCard card={card} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCards;
