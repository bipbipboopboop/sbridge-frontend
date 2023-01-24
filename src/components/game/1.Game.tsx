import styled from "styled-components";

import useGame from "../../hooks/useGame";

import BiddingPanel from "./bidding/BiddingPanel";

import MyCards from "./3.MyCards";
import OtherPlayer from "./2.OtherPlayer";
import TricksPanel from "./tricks/TricksPanel";
import TeammatePanel from "./bidding/TeammatePanel";
import { TrickProvider } from "../../contexts/TrickContext";

const Game = () => {
  const { room, leftPlayer, topPlayer, rightPlayer } = useGame();

  return (
    <TrickProvider>
      {room && (
        <Background>
          <MyCards />
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
    </TrickProvider>
  );
};

export default Game;

const Background = styled.div`
  height: 93vh;
  padding: 0.5em;
  // background: rgb(129, 251, 184);
  // background: linear-gradient(
  //   90deg,
  //   rgba(129, 251, 184, 1) 59%,
  //   rgba(40, 199, 111, 1) 100%
  // );
  background-image: url(https://www.casino.org/blog/wp-content/uploads/Big_Slick-poker-1024x768.png);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`;
