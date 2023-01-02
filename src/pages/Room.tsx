import { useParams } from "react-router-dom";

import ChatRoom from "../components/chatroom/1.ChatRoom";
import Game from "../components/game/Game";
import RoomPanel from "../components/room/RoomPanel";
import useRoom from "../hooks/useRoom";

const Room = () => {
  const { roomID } = useParams();

  // console.log({ room, roomPlayers });
  const { room } = useRoom(roomID);

  const roomIsNotReady = room?.gameStatus === "Not Ready";

  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100" style={{ width: "70%" }}>
        {roomIsNotReady && <RoomPanel />}
        {!roomIsNotReady && <Game />}
      </div>
      <div className="h-100" style={{ width: "30%" }}>
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
