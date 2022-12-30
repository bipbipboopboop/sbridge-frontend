import { firestore, functions } from "../utils/firebase";

import { collection, doc, query } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { useHttpsCallable } from "react-firebase-hooks/functions";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import usePlayer from "./usePlayer";

const useRoom = (roomID: string | undefined) => {
  const roomRef = doc(firestore, `rooms/${roomID}`);
  const [rm, isRoomLoading] = useDocumentData(roomRef);
  const room = rm as Room;

  const roomPlayersRef = collection(firestore, `rooms/${roomID}/players`);
  const roomPlayersQuery = query(roomPlayersRef);

  const [rmPlyrs, isLoadingRoomPlayers] = useCollectionData(roomPlayersQuery);
  const roomPlayers = rmPlyrs as RoomPlayer[];

  const [toggleReady, isTogglingReady] = useHttpsCallable<void, void>(
    functions,
    "toggleReady"
  );
  const { playerData } = usePlayer();
  const isPlayerReady = playerData?.uid
    ? room?.currReadyPlayersUID.includes(playerData.uid)
    : false;

  const handleToggleReady = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleReady();
  };

  return {
    room,
    roomPlayers,
    isRoomLoading,
    isLoadingRoomPlayers,
    isPlayerReady,
    handleToggleReady,
  };
};

export default useRoom;
