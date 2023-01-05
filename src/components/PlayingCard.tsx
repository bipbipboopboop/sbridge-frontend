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
        width: "6em",
        height: "8em",
        minWidth: "6em",
        minHeight: "8em",
        color: isRedSuit ? "#ff525d" : "black",
        borderColor: isRedSuit ? "#ff525d" : "black",
        borderWidth: "0.2em",
        border: "solid",
        transform: `rotate(${rotateBy}deg)`,
        // marginLeft: "-2.5em",
      }}
    >
      <p style={{ font: "1.5em solid" }}>{card.suit}</p>
      <p className="d-flex justify-content-center">{card.rank}</p>
    </BootstrapCard>
    // </Rotate>
  );
};
