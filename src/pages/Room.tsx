import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ChatRoom from "../components/chatroom/1.ChatRoom";
import ReadyButton from "../components/room/ReadyButton";
import useLobby from "../hooks/useLobby";
import useRoom from "../hooks/useRoom";
import { RoomPlayer } from "../types/PlayerType";

type RoomPlayerListProps = {
  roomPlayers: RoomPlayer[];
  roomOwnerUID: string;
  isPlayerAnOwner: boolean;
};

function RoomPlayersList(props: RoomPlayerListProps) {
  return (
    <div>
      {props.roomPlayers?.map((rmPlayer, index) => {
        const isRoomOwner = rmPlayer.uid === props.roomOwnerUID;
        return (
          <div className="my-5" key={index}>
            {`Player ${rmPlayer.playerName} ${isRoomOwner ? "👑" : ""} - ${
              rmPlayer.isReady ? "Ready" : "Not Ready"
            }`}
            {props.isPlayerAnOwner && <Button>Kick</Button>}
          </div>
        );
      })}
    </div>
  );
}

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
              <div>
                <ReadyButton
                  handleToggleReady={handleToggleReady}
                  isPlayerReady={isPlayerReady}
                />
                <button className="btn btn-primary mx-5" onClick={handleLeave}>
                  Leave
                </button>
              </div>
              <div>
                {isPlayerAnOwner && (
                  <Button disabled={!isGameStartable} onClick={handleLeave}>
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
