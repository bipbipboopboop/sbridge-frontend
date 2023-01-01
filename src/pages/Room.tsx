import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ChatRoom from "../components/chatroom/1.ChatRoom";
import ReadyButton from "../components/room/ReadyButton";
import RoomPlayersList from "../components/room/RoomPlayersList";

/**
 * Hooks
 */
import useLobby from "../hooks/useLobby";
import useRoom from "../hooks/useRoom";

const Room = () => {
  const { roomID } = useParams();
  const {
    room,
    roomPlayers,

    isPlayerInRoom,
    isPlayerReady,
    isPlayerAnOwner,
    isGameStartable,

    handleToggleReady,
    handleStartGame,
  } = useRoom(roomID);
  const { handleLeave } = useLobby();

  console.log({ room, roomPlayers });

  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 w-50 p-3">
        <div>
          <h5 className="m-0 p-0">{`Room ${roomID}`}</h5>
          {isPlayerInRoom && (
            <>
              <div className="mt-3">
                <ReadyButton
                  handleToggleReady={handleToggleReady}
                  isPlayerReady={isPlayerReady}
                />
                <Button className="mx-3" onClick={handleLeave}>
                  Leave
                </Button>
              </div>
              <div className="mt-3">
                {isPlayerAnOwner && (
                  <Button disabled={!isGameStartable} onClick={handleStartGame}>
                    Start
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
        <RoomPlayersList
          roomOwnerUID={room?.roomOwnerUID}
          roomPlayers={roomPlayers}
          isPlayerAnOwner={isPlayerAnOwner}
        />
      </div>
      <div className="h-100 w-50">
        <ChatRoom roomID={roomID as string} />
      </div>
    </div>
  );
};

export default Room;
