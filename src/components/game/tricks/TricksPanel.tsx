import { useContext } from "react";
import { Button, Card as BootstrapCard } from "react-bootstrap";
import { TrickContext } from "../../../contexts/TrickContext";

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
  } = useContext(TrickContext);

  return (
    <BootstrapCard className="p-3" style={{ width: "70vh", height: "55vh" }}>
      {!isMyTurn && (
        <p className="text-center p-0 m-0">{`Player ${playerToDeal?.playerName}'s turn to play!`}</p>
      )}
      {isMyTurn && (
        <p className="text-center p-0 m-0">{`Your turn to play!`}</p>
      )}
      {isMyTurn && (
        <p className="text-center p-0 m-0">{`Selecting ${selectedCard?.rank} of ${selectedCard?.suit}`}</p>
      )}

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
