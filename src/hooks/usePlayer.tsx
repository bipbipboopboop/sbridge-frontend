/**
 * Firesbase
 */
import { doc, DocumentReference } from "firebase/firestore";
import { auth, firestore, functions } from "../utils/firebase";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { Player, RoomPlayer } from "../types/PlayerType";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { useNavigate } from "react-router-dom";
import { Room } from "../types/RoomType";

const usePlayer = () => {
  const currPlayerUID = getUID();
  const currPlayerRef = currPlayerUID
    ? (doc(
        firestore,
        "players",
        currPlayerUID
      ) as DocumentReference<Player | null>)
    : null;

  const [playerData, isLoadingPlayer] = useDocumentData<Player | null>(
    currPlayerRef
  );

  const [deleteUser] = useDeleteUser(auth);
  const [deletePlayer] = useHttpsCallable<void, null>(
    functions,
    "deletePlayer"
  );

  const navigate = useNavigate();
  const logOut = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const result = await deletePlayer();
    await deleteUser();
    console.log(`User logged out!`);
    console.log({ result });
    navigate("/");
  };

  const isPlayerInAnyRoom = playerData?.roomID ? true : false;

  // TODO : CHECK WHY KEEP RERENDERING

  /**
   * For Game(Bid & Choose Teammate & Trick)
   */
  const roomPlayerRef =
    playerData &&
    (doc(
      firestore,
      `rooms/${playerData?.roomID}/roomPlayers/${playerData?.uid}`
    ) as DocumentReference<RoomPlayer>);

  const roomRef =
    playerData &&
    (doc(firestore, `rooms/${playerData?.roomID}`) as DocumentReference<Room>);
  const [room] = useDocumentData<Room>(roomRef);

  const [me] = useDocumentData<RoomPlayer>(roomPlayerRef);
  return {
    playerData,
    isLoadingPlayer,
    isPlayerInAnyRoom,
    logOut,

    roomPlayerRef, // Player's ref after joining a room
    roomRef, // Player's room.
    room, // My rooms
    me, // Player Data
  };
};

export default usePlayer;

const getUID = () => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    return null;
  }
};
