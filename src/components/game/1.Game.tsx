import styled from "styled-components";

import useGame from "../../hooks/useGame";

import BiddingPanel from "./BiddingPanel";

import MyCards from "./MyCards";
import OtherPlayer from "./OtherPlayer";
import TricksPanel from "./TricksPanel";

const Game = () => {
  const { room, me, leftPlayer, topPlayer, rightPlayer } = useGame();

  return (
    <>
      {room && (
        <Background>
          <div>{me && <MyCards me={me} />}</div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <OtherPlayer otherPlayer={leftPlayer} />
              <div>
                {room.gameStatus === "Bidding" && <BiddingPanel />}
                {room.gameStatus === "Taking Tricks" && <TricksPanel />}
              </div>
              <OtherPlayer otherPlayer={rightPlayer} />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <OtherPlayer otherPlayer={topPlayer} />
          </div>
        </Background>
      )}
    </>
  );
};

export default Game;

const Background = styled.div`
  height: 93vh;
  padding: 0.5em;
  background: rgb(129, 251, 184);
  background: linear-gradient(
    90deg,
    rgba(129, 251, 184, 1) 59%,
    rgba(40, 199, 111, 1) 100%
  );

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`;
