import React from "react";
import { firestore } from "../../utils/firebase";

import {
  collection,
  query,
  DocumentData,
  DocumentReference,
  getDoc,
  CollectionReference,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface UserDocument extends DocumentData {
  userName: string;
  room: DocumentReference<RoomDocumentData>;
}

interface RoomDocumentData extends DocumentData {
  roomName?: string;
  users: DocumentReference<UserDocument>[];
}

const Test = () => {
  const roomsRef = collection(
    firestore,
    "rooms"
  ) as CollectionReference<RoomDocumentData>;
  const roomsQuery = query(roomsRef);
  const [tempRooms] = useCollectionData(roomsQuery);

  if (typeof tempRooms !== "undefined") {
    const tempRoomsNonNullable = tempRooms as RoomDocumentData[];

    const usersArrayInRooms = tempRoomsNonNullable.map((room) => room.users);

    const populatedUsersArrayInRooms = usersArrayInRooms.map((users) => {
      return users.map(async (user) => {
        const usr = await getDoc(user);
        console.log(usr.data());
        return usr.data();
      });
    });

    console.log({ populatedUsersArrayInRooms });
  }

  const objectMapFunction = (
    object: Object,
    mapFunction: (arg1: any, arg2?: number) => any
  ) => {
    const result = Object.keys(object).map(mapFunction);
    return result;
  };

  const populate = function (documentData: DocumentData, depth: number = 1) {
    if (depth === 1) {
      const mappingFunction = async function (key: string) {
        const docFieldValue = documentData[key];
        try {
          // console.log(`In try : ${key} - ${JSON.stringify(docFieldValue)}`);
          if (Array.isArray(docFieldValue)) {
            const arr = docFieldValue;
            const populatedArr = arr.map(async (item) => {
              const populatedItem = await (await getDoc(item)).data();
              console
                .log
                // `In try : populatedArrItem ${[JSON.stringify(populatedItem)]}`
                ();
              return populatedItem;
            });
            // console.log(`In try : populatedArr ${populatedArr}`);
            return populatedArr;
          } else {
            const populatedField = await getDoc(docFieldValue);
            // console.log(`In try : populated field ${populatedField}`);
            return populatedField;
          }
        } catch (err) {
          console.log(`In Error : ${key} - ${docFieldValue}`);
          return docFieldValue;
        }
      };
      return objectMapFunction(documentData, mappingFunction);
    } else {
      Object.keys(documentData).map(function (key) {
        try {
          return populate(documentData[key], depth - 1);
        } catch (err) {
          return documentData[key];
        }
      });
    }
  };

  const rooms = tempRooms?.map((room) => populate(room));

  const usersRef = collection(firestore, "users");
  const usersQuery = query(usersRef);
  const [users] = useCollectionData(usersQuery);

  return (
    <>
      {console.log({
        roomsRef,
        roomsQuery,
        tempRooms,
        rooms,
        users,
      })}
    </>
  );
};

export default Test;
