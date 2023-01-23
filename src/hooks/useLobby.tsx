import { firestore } from "../utils/firebase";

import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { Room } from "../types/RoomType";

const useLobby = () => {
  const roomsRef = collection(firestore, "rooms");
  const roomsQuery = query(roomsRef);

  const [roomQuerySnapshots] = useCollection(roomsQuery);

  const rooms = roomQuerySnapshots?.docs.map((rm) => ({
    roomID: rm.id,
    ...rm.data(),
  })) as unknown as Room[];

  return {
    rooms,
  };
};

export default useLobby;
