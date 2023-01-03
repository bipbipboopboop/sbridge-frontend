import { Button } from "react-bootstrap";
import styled from "styled-components";

import { Card as CardClass } from "../../../utils/cards";
import PlayingCard from "../../PlayingCard";

const TricksPanel = () => {
  // const {} = useGame();
  return (
    <div
      className="d-flex p-3 justify-content-center align-items-center"
      style={{
        width: "70vh",
        height: "50vh",
        backgroundColor: "white",
        borderRadius: "0.5em",
      }}
    >
      {/* {isMyTurn && (
        <p className="d-flex justify-content-center">{`Your turn to bid!`}</p>
      )}
      {!isMyTurn && (
        <p className="d-flex justify-content-center">{`Waiting for Player ${playerToBid?.playerName} to bid`}</p>
      )} */}

      <PlayingTable>
        <div />
        <PlayingCard card={new CardClass("♠", "A")} />
        <div />

        <PlayingCard card={new CardClass("♠", "K")} orientation={"left"} />
        <div />
        <PlayingCard card={new CardClass("♠", "Q")} orientation={"right"} />

        <div className="d-flex align-items-center">
          <Button>Play</Button>
        </div>
        <PlayingCard card={new CardClass("♠", "J")} />
        <div />
      </PlayingTable>
    </div>
  );
};

export default TricksPanel;

const PlayingTable = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr; 
  gap: 0px 0px;
}
`;
