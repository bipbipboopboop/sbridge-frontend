import { doc, DocumentReference, setDoc } from "firebase/firestore";

import { PlayerType } from "../types/PlayerType";
import { auth, firestore } from "./firebase";

/**
 * Creates a `Player` instance using the current `User` instance,
 * where `Player` is an augmentation of `User` with additional information(playerName).
 * Used when a user logs in anonymously.
 *
 * @param {string} playerName
 */
const addPlayer = ({ playerName }: Omit<PlayerType, "uid" | "roomID">) => {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    setDoc(doc(firestore, "players", uid), {
      uid: auth.currentUser.uid,
      playerName,
      roomID: "publicLobby",
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

const getCurrPlayerRef = () => {
  const currPlayerUID = getUID();
  const currPlayerRef = currPlayerUID
    ? (doc(
        firestore,
        "players",
        currPlayerUID
      ) as DocumentReference<PlayerType>)
    : null;
  return currPlayerRef;
};
const currPlayerRef = getCurrPlayerRef();

export { addPlayer, currPlayerRef };
