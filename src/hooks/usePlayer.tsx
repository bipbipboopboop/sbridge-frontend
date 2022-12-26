/**
 * Firesbase
 */
import { doc, DocumentReference } from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { PlayerType } from "../types/PlayerType";

const usePlayer = () => {
  const getUID = () => {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      return null;
    }
  };
  const currPlayerUID = getUID();
  const currPlayerRef = currPlayerUID
    ? (doc(
        firestore,
        "players",
        currPlayerUID
      ) as DocumentReference<PlayerType | null>)
    : null;

  const [playerData] = useDocumentData<PlayerType | null>(currPlayerRef);
  const [deleteUser] = useDeleteUser(auth);

  const logOut = async () => {
    try {
      await deleteUser();
      console.log(`User logged out!`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const isPlayerInAnyRoom = playerData?.roomID ? true : false;
  return { playerData, isPlayerInAnyRoom, logOut };
};

export default usePlayer;
