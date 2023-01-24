/**
 * Hooks
 */
import { useParams } from "react-router-dom";

import useRoom from "../../hooks/useRoom";
import useRoomActions from "../../hooks/useRoomActions";
import Background from "../Background";

import RoomButtons from "./2.RoomButtons";
import RoomPlayersList from "./3.RoomPlayersList";

const WaitingArea = () => {
  const { roomID } = useParams();
  const {
    room,
    roomPlayers,

    isPlayerInRoom,
    isPlayerReady,
    isPlayerAnOwner,
    isGameStartable,
  } = useRoom(roomID);

  const { handleToggleReady, handleStartGame } = useRoomActions();
  const { handleLeave } = useRoomActions();

  return (
    <Background backgroundUrl="https://img5.goodfon.com/wallpaper/nbig/a/3d/fon-oboi-pikseli-kvadrat-zelionyi.jpg">
      {room && (
        <div className="h-100 p-3">
          <div>
            <h5 className="m-0 p-0">{`Room ${roomID}`}</h5>
            {isPlayerInRoom && (
              <RoomButtons
                isPlayerReady={isPlayerReady}
                isPlayerAnOwner={isPlayerAnOwner}
                isGameStartable={isGameStartable}
                handleToggleReady={handleToggleReady}
                handleStartGame={handleStartGame}
                handleLeave={handleLeave}
              />
            )}
          </div>
          {roomPlayers && (
            <RoomPlayersList
              roomOwnerUID={room.roomOwnerUID}
              roomPlayers={roomPlayers}
              isPlayerAnOwner={isPlayerAnOwner}
            />
          )}
        </div>
      )}
    </Background>
  );
};

export default WaitingArea;
