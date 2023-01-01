import { doc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import usePlayer from "./usePlayer";

const useGame = (roomID: string | undefined) => {
  const { playerData } = usePlayer();
  const gamePlayer = doc(
    firestore,
    `rooms/${roomID}/games//${playerData?.uid}`
  );
  return <></>;
};

export default useGame;
