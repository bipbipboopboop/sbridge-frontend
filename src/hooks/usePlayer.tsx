/**
 * Firesbase
 */
import { doc, DocumentReference } from "firebase/firestore";
import { auth, firestore, functions } from "../utils/firebase";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { Player } from "../types/PlayerType";
import { useHttpsCallable } from "react-firebase-hooks/functions";

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

  const logOut = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const result = await deletePlayer();
    await deleteUser();
    console.log(`User logged out!`);
    console.log({ result });
  };

  const isPlayerInAnyRoom = playerData?.roomID ? true : false;
  console.log({ playerData, isLoadingPlayer, isPlayerInAnyRoom });
  return { playerData, isLoadingPlayer, isPlayerInAnyRoom, logOut };
};

export default usePlayer;

const getUID = () => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    return null;
  }
};
