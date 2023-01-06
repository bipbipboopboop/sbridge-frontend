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

    // For calculating z-index
    leftOffset,
    topOffset,
    rightOffset,
    bottomOffset,

    // For declaring on prompt
    playerToDeal,
    selectedCard,

    isMyTurn,
    handleDeal,
  } = useTrick();

  return (
    <BootstrapCard className="p-3" style={{ width: "30em", height: "25em" }}>
      <p className="text-center p-0 m-0">{`Player ${playerToDeal?.playerName}'s turn to play!`}</p>
      <p>{`Selecting ${selectedCard?.rank} of ${selectedCard?.suit}`}</p>
      <p>{JSON.stringify(selectedCard)}</p>

      <BootstrapCard.Body>
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          {topCard && (
            <div style={{ zIndex: topOffset }}>
              <PlayingCard card={new CardClass(topCard?.suit, topCard?.rank)} />
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ height: "5em" }}
        >
          {leftCard && (
            <div style={{ zIndex: leftOffset }}>
              <PlayingCard
                card={new CardClass(leftCard?.suit, leftCard?.rank)}
                orientation={"left"}
              />
            </div>
          )}
          {rightCard && (
            <div style={{ zIndex: rightOffset }}>
              <PlayingCard
                card={new CardClass(rightCard?.suit, rightCard?.rank)}
                orientation={"right"}
              />
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ height: "5em" }}
        >
          {bottomCard && (
            <div style={{ zIndex: bottomOffset }}>
              <PlayingCard
                card={new CardClass(bottomCard.suit, bottomCard.rank)}
              />
            </div>
          )}
        </div>
      </BootstrapCard.Body>
      {isMyTurn && <Button onClick={handleDeal}>Deal</Button>}
    </BootstrapCard>
  );
};

export default TricksPanel;
