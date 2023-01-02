import useGame from "../../hooks/useGame";

import MyCards from "./MyCards";

const Game = () => {
  const { me, room, leftPlayer, topPlayer, rightPlayer } = useGame();
  console.log({ players: room?.biddingPhase?.players });
  return (
    <div className="h-100 d-flex flex-column-reverse justify-content-between">
      <div>
        <pre>
          {JSON.stringify({ position: me?.position, name: me?.playerName })}
        </pre>
        <div className="d-flex">{me && <MyCards roomPlayer={me} />}</div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <p>{leftPlayer?.playerName}</p>
        </div>
        <div>
          <p>{rightPlayer?.playerName}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <p>{topPlayer?.playerName}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
