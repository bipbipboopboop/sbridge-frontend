import {
  query,
  collection,
  where,
  DocumentData,
  updateDoc,
  arrayRemove,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionDataOnce,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { auth, firestore } from "../utils/firebase";

const useLeaveRoom = () => {
  const [user] = useAuthState(auth);

  if (user) {
    const roomsRef = collection(firestore, "rooms");
    const roomQuery = query(
      roomsRef,
      where("players", "array-contains", user?.uid)
    );
    const [roomSnapshots] = useCollectionOnce(roomQuery);
    const isPlayerNotInAnyRoom = roomSnapshots?.empty as boolean;
    if (!isPlayerNotInAnyRoom) {
      roomSnapshots?.forEach(async (roomSS) => {
        const roomLeftOnePlayer = roomSS.data().players.length === 1;
        if (roomLeftOnePlayer) {
          await deleteDoc(roomSS.ref);
          const currPlayerRef = doc(firestore, `players/${user.uid}`);
          updateDoc(currPlayerRef, { roomID: "publicLobby" });
        } else {
          await updateDoc(roomSS.ref, {
            players: arrayRemove(user.displayName),
          });
        }
      });
    }
  }
};

export default useLeaveRoom;
