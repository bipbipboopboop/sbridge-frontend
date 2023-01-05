import { Button, Card as BootstrapCard } from "react-bootstrap";

import { Card as CardClass } from "../../../utils/cards";
import PlayingCard from "../../PlayingCard";

const TricksPanel = () => {
  // const {} = useGame();
  return (
    <BootstrapCard className="p-3" style={{ width: "30em", height: "25em" }}>
      <p>Player aa's turn to play!</p>

      <BootstrapCard.Body className="h-50">
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          <PlayingCard card={new CardClass("♠", "A")} />
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ height: "5em" }}
        >
          <PlayingCard card={new CardClass("♠", "K")} orientation={"left"} />
          <PlayingCard card={new CardClass("♠", "Q")} orientation={"right"} />
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          <PlayingCard card={new CardClass("♠", "J")} />
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default TricksPanel;
