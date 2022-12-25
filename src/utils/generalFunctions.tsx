import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { auth, firestore } from "./firebase";

const getCollectionRef = (path: string) => {
  if (!auth.currentUser) return null;
  return collection(firestore, path);
};

const addDocument = (ref: CollectionReference, itemToAdd: DocumentData) => {
  return addDoc(ref, itemToAdd);
};

export { getCollectionRef, addDocument };
