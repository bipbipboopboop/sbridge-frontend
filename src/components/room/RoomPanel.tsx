/**
 * Hooks
 */
import { useParams } from "react-router-dom";
import useLobby from "../../hooks/useLobby";
import useRoom from "../../hooks/useRoom";

import RoomButtons from "./RoomButtons";
import RoomPlayersList from "./RoomPlayersList";

const RoomPanel = () => {
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
  return (
    <>
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
      <RoomPlayersList
        roomOwnerUID={room?.roomOwnerUID}
        roomPlayers={roomPlayers}
        isPlayerAnOwner={isPlayerAnOwner}
      />
    </>
  );
};

export default RoomPanel;
