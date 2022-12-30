import { firestore, functions } from "../utils/firebase";

import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { Room } from "../types/RoomType";
import { useNavigate } from "react-router-dom";

const useLobby = () => {
  const roomsRef = collection(firestore, "rooms");
  const roomsQuery = query(roomsRef);

  const [roomQuerySnapshots] = useCollection(roomsQuery);

  const rooms = roomQuerySnapshots?.docs.map((rm) => ({
    roomID: rm.id,
    ...rm.data(),
  })) as unknown as Room[];

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

  return {
    rooms,
    isCreatingRoom,
    isJoiningRoom,
    isLeavingRoom,
    handleCreate,
    handleJoin,
    handleLeave,
  };
};

export default useLobby;
