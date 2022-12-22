import { addDoc, collection, CollectionReference } from "firebase/firestore";
import { PlayerType } from "../types/PlayerType";
import { auth, firestore } from "./firebase";

const playersRef = collection(
  firestore,
  "players"
) as CollectionReference<PlayerType>;

const addPlayer = ({ playerName, roomID }: Omit<PlayerType, "uid">) => {
  if (auth.currentUser) {
    addDoc(playersRef, {
      uid: auth.currentUser.uid,
      playerName,
      roomID,
    });
  } else {
    throw new Error("User doesn't exist!");
  }
};

export { playersRef, addPlayer };
