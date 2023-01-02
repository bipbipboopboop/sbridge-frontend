import { Card } from "react-bootstrap";
import useGame from "../../hooks/useGame";
import BiddingPanel from "./BiddingPanel";

import MyCards from "./MyCards";

const Game = () => {
  const { me, leftPlayer, topPlayer, rightPlayer } = useGame();

  return (
    <div className="h-100 d-flex flex-column-reverse justify-content-between">
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
        <div className="d-flex">
          <div>
            <p>{topPlayer?.playerName}</p>
          </div>
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
    </div>
  );
};

export default Game;
