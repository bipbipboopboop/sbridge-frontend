import { Card } from "react-bootstrap";
import { Card as CardClass } from "../utils/cards";

type CardProps = {
  card: CardClass;
};

const PlayingCard = (props: CardProps) => {
  const { card } = props;
  const isRedSuit = card.suit === "♥" || card.suit === "♦";
  return (
    <Card
      className="p-2 mx-1"
      style={{
        width: "6em",
        height: "8em",
        minWidth: "6em",
        minHeight: "8em",
        color: isRedSuit ? "#ff525d" : "black",
        borderColor: isRedSuit ? "#ff525d" : "black",
        border: "0.2em solid",
      }}
    >
      <p style={{ font: "1.5em solid" }}>{card.suit}</p>
      <p className="d-flex justify-content-center">{card.rank}</p>
    </Card>
  );
};

export default PlayingCard;
