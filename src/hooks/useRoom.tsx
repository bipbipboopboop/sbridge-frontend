import { firestore, functions } from "../utils/firebase";

import { collection, doc, query } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
// import { useHttpsCallable } from "react-firebase-hooks/functions";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";

const useRoom = (roomID: string | undefined) => {
  const roomRef = doc(firestore, `rooms/${roomID}`);
  const [rm, isRoomLoading] = useDocumentData(roomRef);
  const room = rm as Room;

  const roomPlayersRef = collection(firestore, `rooms/${roomID}/players`);
  const roomPlayersQuery = query(roomPlayersRef);

  const [rmPlyrs, isLoadingRoomPlayers] = useCollectionData(roomPlayersQuery);
  const roomPlayers = rmPlyrs as RoomPlayer[];

  //   const [toggleReady, isTogglingReady] = useHttpsCallable(functions, "toggleReady");

  return { room, roomPlayers, isRoomLoading, isLoadingRoomPlayers };
};

export default useRoom;
