import { doc, DocumentReference } from "firebase/firestore";
import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PlayerType } from "../types/PlayerType";

import { auth, firestore } from "../utils/firebase";
import { deleteCurrPlayer } from "../utils/playerFunctions";

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
      ) as DocumentReference<PlayerType>)
    : null;
  console.log({ currPlayerRef });
  const [playerData] = useDocumentData<PlayerType | null>(currPlayerRef);

  const [deleteUser] = useDeleteUser(auth);

  const logOut = async () => {
    try {
      deleteCurrPlayer();
      await deleteUser();
      console.log(`User logged out!`);
    } catch (e: any) {
      alert(e.message);
    }
  };
  return { playerData, logOut };
};

export default usePlayer;
