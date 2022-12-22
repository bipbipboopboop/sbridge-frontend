import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { PlayerType } from "../types/PlayerType";
import { auth, firestore } from "./firebase";

const playersRef = collection(
  firestore,
  "players"
) as CollectionReference<PlayerType>;

const addPlayer = ({ playerName, roomID }: Omit<PlayerType, "uid">) => {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    setDoc(doc(firestore, "players", uid), {
      uid: auth.currentUser.uid,
      playerName,
      roomID,
    });
  } else {
    throw new Error("User doesn't exist!");
  }
};

const getUID = () => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    return null;
  }
};

const asyncGetPlayer = async () => {
  const currPlayerUID = getUID();

  if (currPlayerUID) {
    const currPlayerRef = doc(firestore, "players", currPlayerUID);
    const currPlayer = await getDoc(currPlayerRef);
    console.log({ currPlayer });
    return currPlayer;
  }
  return null;
};

asyncGetPlayer();

export { playersRef, addPlayer, getUID };
