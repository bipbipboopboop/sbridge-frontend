import { useNavigate } from "react-router-dom";

/**
 * Firebase utils
 */
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { functions } from "../utils/firebase";

/**
 * Typings
 */
import { Room } from "../types/RoomType";

const useRoomActions = () => {
  const [create, isCreatingRoom, createRoomError] = useHttpsCallable<
    void,
    Room
  >(functions, "createRoom");
  const [joinRoom, isJoiningRoom, joinRoomError] = useHttpsCallable<
    string,
    void
  >(functions, "joinRoom");
  const [leaveRoom, isLeavingRoom, leaveRoomError] = useHttpsCallable<
    void,
    void
  >(functions, "leaveRoom");

  const navigate = useNavigate();
  const handleCreate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newRoom = (await create())?.data as Room;
    console.log({ newRoom });
    createRoomError
      ? alert(createRoomError.message)
      : navigate(`rooms/${newRoom.roomID}`);
  };

  const handleJoin =
    (roomID: string) => async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      await joinRoom(roomID);
      //TODO : Check if is able to join room or not on backend and frontend
      joinRoomError
        ? alert(joinRoomError.message)
        : navigate(`rooms/${roomID}`);
    };

  const handleLeave = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await leaveRoom();
    leaveRoomError ? alert(leaveRoomError.message) : navigate("/");
  };

  // In-room functions
  const [toggleReady, isTogglingReady] = useHttpsCallable<void, void>(
    functions,
    "toggleReady"
  );
  const [startBid, isBidStarting] = useHttpsCallable<void, void>(
    functions,
    "startBid"
  );

  const handleToggleReady = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await toggleReady();
  };

  const handleStartGame = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await startBid();
  };

  return {
    isCreatingRoom,
    isJoiningRoom,
    isLeavingRoom,

    isTogglingReady,
    isBidStarting,

    handleCreate,
    handleJoin,
    handleLeave,

    handleToggleReady,
    handleStartGame,
  };
};

export default useRoomActions;
