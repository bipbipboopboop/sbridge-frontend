import { firestore, functions } from "../utils/firebase";

import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { Room } from "../types/RoomType";

const useLobby = () => {
  const roomsRef = collection(firestore, "rooms");
  const roomsQuery = query(roomsRef);

  const [roomQuerySnapshots] = useCollection(roomsQuery);
  const rooms = roomQuerySnapshots?.docs.map((rm) => ({
    roomID: rm.id,
    ...rm.data(),
  })) as unknown as Room[];

  const [create, isCreatingRoom] = useHttpsCallable(functions, "createRoom");
  const [joinRoom, isJoiningRoom] = useHttpsCallable(functions, "joinRoom");
  const [leaveRoom, isLeavingRoom] = useHttpsCallable(functions, "leaveRoom");

  return {
    rooms,
    createRoom: create,
    joinRoom,
    leaveRoom,
    isCreatingRoom,
    isJoiningRoom,
    isLeavingRoom,
  };
};

export default useLobby;
