import { doc, setDoc } from "firebase/firestore";

import { PlayerType } from "../types/PlayerType";
import { auth, firestore } from "./firebase";

/**
 * Creates a `Player` instance using the current `User` instance,
 * where `Player` is an augmentation of `User` with additional information(playerName).
 * Used when a user logs in anonymously.
 *
 * @param {string} playerName
 */
const addCurrPlayer = ({ playerName }: Omit<PlayerType, "uid" | "roomID">) => {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    setDoc(doc(firestore, "players", uid), {
      uid: auth.currentUser.uid,
      playerName,
      roomID: null,
    });
  } else {
    throw new Error("User doesn't exist!");
  }
};

export { addCurrPlayer };
