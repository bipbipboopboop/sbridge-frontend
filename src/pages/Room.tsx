import { useParams } from "react-router-dom";
import ChatRoom from "../components/chatroom/1.ChatRoom";
import useLobby from "../hooks/useLobby";
import usePlayer from "../hooks/usePlayer";
import useRoom from "../hooks/useRoom";

const Room = () => {
  const { roomID } = useParams();
  const { room, roomPlayers, handleToggleReady, isPlayerReady } =
    useRoom(roomID);
  const { handleLeave } = useLobby();

  console.log({ room, roomPlayers });

  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 w-50 p-3">
        <div>
          <h5 className="m-0 p-0">{`Room ${roomID}`}</h5>
          <button className="btn btn-primary" onClick={handleToggleReady}>
            {isPlayerReady ? "I'm Not Ready :(" : "I'm Ready!"}
          </button>
          <button className="btn btn-primary" onClick={handleLeave}>
            Leave
          </button>
        </div>
        <div>
          <pre>{JSON.stringify(room)}</pre>
          {roomPlayers?.map((rmPlayer, index) => {
            const isRoomOwner = rmPlayer.uid === room.roomOwnerUID;
            return (
              <div className="my-5" key={index}>
                <p>{`Name : ${rmPlayer.playerName} ${
                  isRoomOwner ? "👑" : ""
                } - ${rmPlayer.isReady ? "Ready" : "Not Ready"}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-100 w-50">
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
