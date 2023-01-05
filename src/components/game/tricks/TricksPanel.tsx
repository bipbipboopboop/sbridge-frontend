import { Button, Card as BootstrapCard } from "react-bootstrap";
import useTrick from "../../../hooks/useTrick";

import { Card as CardClass } from "../../../utils/cards";
import PlayingCard from "../../PlayingCard";

const TricksPanel = () => {
  const {
    topPlayerTableCard: topCard,
    leftPlayerTableCard: leftCard,
    rightPlayerTableCard: rightCard,
    bottomPlayerTableCard: bottomCard,

    isMyTurn,
    handleDeal,
  } = useTrick();
  return (
    <BootstrapCard className="p-3" style={{ width: "30em", height: "25em" }}>
      <p className="text-center p-0 m-0">Player aa's turn to play!</p>

      <BootstrapCard.Body>
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          {topCard && (
            <div>
              <PlayingCard card={new CardClass(topCard.suit, topCard.rank)} />
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ height: "5em" }}
        >
          {leftCard && (
            <PlayingCard
              card={new CardClass(leftCard.suit, leftCard.rank)}
              orientation={"left"}
            />
          )}
          {rightCard && (
            <PlayingCard
              card={new CardClass(rightCard.suit, rightCard.rank)}
              orientation={"right"}
            />
          )}
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          {bottomCard && (
            <PlayingCard
              card={new CardClass(bottomCard.suit, bottomCard.rank)}
            />
          )}
        </div>
      </BootstrapCard.Body>
      {isMyTurn && <Button onClick={handleDeal}>Deal</Button>}
    </BootstrapCard>
  );
};

export default TricksPanel;
