import { useParams } from "react-router-dom";

import ChatRoom from "../components/chatroom/1.ChatRoom";
import RoomPanel from "../components/room/RoomPanel";

const Room = () => {
  const { roomID } = useParams();

  // console.log({ room, roomPlayers });

  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 p-3" style={{ width: "70%" }}>
        <RoomPanel />
      </div>
      <div className="h-100" style={{ width: "30%" }}>
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
