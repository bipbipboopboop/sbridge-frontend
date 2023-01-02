import { Card } from "react-bootstrap";
import styled from "styled-components";
import useGame from "../../hooks/useGame";
import BiddingPanel from "./BiddingPanel";

import MyCards from "./MyCards";

const Game = () => {
  const { me, leftPlayer, topPlayer, rightPlayer } = useGame();

  return (
    <Background>
      {/* <div className="h-100 d-flex flex-column-reverse justify-content-between"> */}
      <div>{me && <MyCards me={me} />}</div>
      <div className="d-flex justify-content-between">
        <div>
          <p>{leftPlayer?.playerName}</p>
          <Card
            style={{
              width: "6em",
              height: "8em",
              minWidth: "6em",
              minHeight: "8em",
            }}
          />
        </div>
        <div>
          <BiddingPanel />
        </div>
        <div>
          <p>{rightPlayer?.playerName}</p>
          <Card
            style={{
              width: "6em",
              height: "8em",
              minWidth: "6em",
              minHeight: "8em",
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="mb-2">
          <p>{topPlayer?.playerName}</p>

          <Card
            style={{
              width: "6em",
              height: "8em",
              minWidth: "6em",
              minHeight: "8em",
            }}
          />
        </div>
      </div>
    </Background>
    // </div>
  );
};

export default Game;

const Background = styled.div`
  height: 93vh;
  padding: 1em;
  background: rgb(129, 251, 184);
  background: linear-gradient(
    90deg,
    rgba(129, 251, 184, 1) 59%,
    rgba(40, 199, 111, 1) 100%
  );
  justify-content: between;
  display: flex;
  flex-direction: column-reverse;
`;
