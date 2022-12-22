import { useDeleteUser } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PlayerType } from "../types/PlayerType";

import { auth } from "../utils/firebase";
import { currPlayerRef, deleteCurrPlayer } from "../utils/playerFunctions";

const usePlayer = () => {
  const [playerData] = useDocumentData<PlayerType | null>(currPlayerRef);
  console.log({ currPlayerRef });

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
