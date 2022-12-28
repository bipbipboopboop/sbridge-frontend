/**
 * Firesbase
 */
import { doc, DocumentReference } from "firebase/firestore";
import { auth, firestore, functions } from "../utils/firebase";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { PlayerType } from "../types/PlayerType";
import { useHttpsCallable } from "react-firebase-hooks/functions";

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
  const [deletePlayer] = useHttpsCallable<void, null>(
    functions,
    "deletePlayer"
  );

  const logOut = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const result = await deletePlayer();
    await deleteUser();
    console.log(`User logged out!`);
    console.log({ result });
  };

  const isPlayerInAnyRoom = playerData?.roomID ? true : false;
  return { playerData, isPlayerInAnyRoom, logOut };
};

export default usePlayer;
