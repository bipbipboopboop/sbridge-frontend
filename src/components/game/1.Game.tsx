import styled from "styled-components";

import useGame from "../../hooks/useGame";

import BiddingPanel from "./bidding/BiddingPanel";

import MyCards from "./3.MyCards";
import OtherPlayer from "./2.OtherPlayer";
import TricksPanel from "./tricks/TricksPanel";
import TeammatePanel from "./bidding/TeammatePanel";

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
                {room.gameStatus === "Choosing Teammate" && <TeammatePanel />}
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
