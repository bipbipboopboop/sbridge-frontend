import { Button, Card as BootstrapCard } from "react-bootstrap";
import useSelectTeammate from "../../../hooks/useSelectTeammate";
import { SuitArray } from "../../../utils/bids";

import PlayingCard from "../../PlayingCard";

const TeammatePanel = () => {
  const { selectableCards, handleSelectSuit, isBidWinner, bidWinner } =
    useSelectTeammate();

  return (
    <BootstrapCard className="p-3" style={{ width: "70vh", height: "50vh" }}>
      {isBidWinner && "Pick your teammate!"}
      {!isBidWinner && `${bidWinner?.playerName} is selecting teammate...`}
      <BootstrapCard.Body>
        {isBidWinner &&
          SuitArray.map(
            (suit, suitValue) =>
              suit !== "NT" && (
                <Button
                  className="mx-1 my-1"
                  key={suitValue}
                  onClick={handleSelectSuit(suit)}
                >
                  {suit}
                </Button>
              )
          )}
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {selectableCards
            .sort((cardA, cardB) => cardB.compareTo(cardA))
            .map((card, index) => (
              <div
                key={index}
                style={{ marginLeft: index === 0 ? "0" : "-2.2em" }}
              >
                <PlayingCard card={card} />
              </div>
            ))}
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default TeammatePanel;
