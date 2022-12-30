import { useParams } from "react-router-dom";
import ChatRoom from "../components/chatroom/1.ChatRoom";

const Room = () => {
  const { roomID } = useParams();
  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 w-50 p-3">Room</div>
      <div className="h-100 w-50">
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
