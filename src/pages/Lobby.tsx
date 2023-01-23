/**
 * Hooks
 */
import { useAuthState } from "react-firebase-hooks/auth";
import useLobby from "../hooks/useLobby";
import usePlayer from "../hooks/usePlayer";

/**
 * Utils
 */
import { auth } from "../utils/firebase";

/**
 * Components
 */
import CreateRoomButton from "../components/buttons/CreateRoomButton";
import RoomList from "../components/lobby/RoomList";
import useRoomActions from "../hooks/useRoomActions";

const Lobby = () => {
  const [user] = useAuthState(auth); // TODO: Use either useAuthState or usePlayer
  const { isPlayerInAnyRoom } = usePlayer();
  const { rooms } = useLobby();

  const {
    isCreatingRoom,
    isJoiningRoom,
    isLeavingRoom,
    handleCreate,
    handleJoin,
    handleLeave,
  } = useRoomActions();

  // console.log({ rooms });

  return (
    <div className="w-100 h-100 d-flex">
      {user && (
        <>
          <div className="h-100 w-50 pt-3 px-3">
            <h1>Rooms</h1>
            <CreateRoomButton
              handleCreate={handleCreate}
              isCreatingRoom={isCreatingRoom}
              isPlayerInAnyRoom={isPlayerInAnyRoom}
            />
            <RoomList
              user={user}
              isPlayerInAnyRoom={isPlayerInAnyRoom}
              rooms={rooms}
              isJoiningRoom={isJoiningRoom}
              isLeavingRoom={isLeavingRoom}
              handleJoin={handleJoin}
              handleLeave={handleLeave}
            />
          </div>
          <div className="h-100 w-50 pt-3 px-3">
            <h1>Top Players</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Lobby;
