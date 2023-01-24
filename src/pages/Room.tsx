import { useParams } from "react-router-dom";

import ChatRoom from "../components/chatroom/1.ChatRoom";
import Game from "../components/game/1.Game";
import WaitingArea from "../components/room/1.WaitingArea";
import useRoom from "../hooks/useRoom";

const Room = () => {
  const { roomID } = useParams();

  const { room } = useRoom(roomID);

  const roomIsNotReady = room?.gameStatus === "Not Ready";

  return (
    <div className="w-100 d-flex" style={{ height: "93vh" }}>
      <div className="h-100" style={{ width: "70%" }}>
        {roomIsNotReady && <WaitingArea />}
        {!roomIsNotReady && <Game />}
      </div>
      <div className="h-100" style={{ width: "30%" }}>
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
