import { query, collection, where, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../utils/firebase";

type Props = {};

const useCreateRoom = (props: Props) => {
  const [user] = useAuthState(auth);
};

export default useCreateRoom;
