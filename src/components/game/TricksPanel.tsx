import styled from "styled-components";
import useGame from "../../hooks/useGame";
import { Card as CardClass } from "../../utils/cards";
import PlayingCard from "../PlayingCard";

const TricksPanel = () => {
  // const {} = useGame();
  return (
    <div
      className="d-flex p-3 justify-content-center"
      style={{ width: "50vh", height: "50vh" }}
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
        <PlayingCard card={new CardClass("♠", "A")} orientation={"left"} />
        <div />
        <PlayingCard card={new CardClass("♠", "A")} orientation={"right"} />
        <div />
        <PlayingCard card={new CardClass("♠", "A")} />
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
