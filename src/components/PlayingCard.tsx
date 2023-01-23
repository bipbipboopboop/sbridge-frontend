import { Card as BootstrapCard } from "react-bootstrap";

import { Card as CardClass } from "../utils/cards";

type CardProps = {
  card: CardClass;
};

const PlayingCard = (props: CardProps & { orientation?: string }) => {
  const { card, orientation } = props;
  switch (orientation) {
    case "left":
      return <Card card={card} rotateBy={90} />;
    case "right":
      return <Card card={card} rotateBy={270} />;
    default:
      return <Card card={card} rotateBy={0} />;
  }
};

export default PlayingCard;

const Card = (props: CardProps & { rotateBy: number }) => {
  const { card, rotateBy } = props;

  const isRedSuit = card.suit === "♥" || card.suit === "♦";
  return (
    // <Rotate by={rotateBy}>
    <BootstrapCard
      className="p-2"
      style={{
        width: "12vh",
        height: "17vh",
        // minWidth: "12vh",
        // minHeight: "17vh",
        color: isRedSuit ? "#ff525d" : "black",
        borderColor: isRedSuit ? "#ff525d" : "black",
        borderWidth: "0.2em",
        border: "solid",
        transform: `rotate(${rotateBy}deg)`,
        // marginLeft: "-2.5em",
      }}
    >
      <p className="mb-0 p-0" style={{ font: "4.5vh solid" }}>
        {card.suit}
      </p>
      <div className="h-100 d-flex flex-column justify-content-center">
        <p className="d-flex justify-content-center m-0">{card.rank}</p>
      </div>
    </BootstrapCard>
    // </Rotate>
  );
};
