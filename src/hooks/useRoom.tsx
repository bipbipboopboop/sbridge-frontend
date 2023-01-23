import { firestore } from "../utils/firebase";

import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  query,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import usePlayer from "./usePlayer";

/**
 * Provides information of a room.
 * @param roomID
 *
 */
const useRoom = (roomID: string | undefined) => {
  // Getting room
  const roomRef = doc(firestore, `rooms/${roomID}`) as DocumentReference<Room>;
  const [room, isRoomLoading] = useDocumentData<Room>(roomRef);
  // Getting room

  // Getting roomPlayers
  const roomPlayersRef = collection(
    firestore,
    `rooms/${roomID}/roomPlayers`
  ) as CollectionReference<RoomPlayer>;
  const roomPlayersQuery = query(roomPlayersRef);

  const [roomPlayers, isLoadingRoomPlayers] =
    useCollectionData<RoomPlayer>(roomPlayersQuery);
  // Getting roomPlayers

  const { playerData } = usePlayer();
  const isPlayerReady =
    room?.currReadyPlayersUID.includes(playerData?.uid as string) || false;

  const isPlayerInRoom =
    room?.playersUID?.includes(playerData?.uid as string) || false;

  const isPlayerAnOwner = room?.roomOwnerUID === playerData?.uid;

  const isGameStartable = room?.currReadyPlayersUID.length === 4;

  return {
    room,
    roomPlayers,

    isPlayerInRoom,
    isPlayerReady,
    isPlayerAnOwner,
    isGameStartable,

    isRoomLoading,
    isLoadingRoomPlayers,
  };
};

export default useRoom;
