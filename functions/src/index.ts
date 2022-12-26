import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  DocumentReference,
  DocumentData,
  FieldValue,
} from "firebase-admin/firestore";

import {Room} from "../utils/RoomType";
import {Player} from "../utils/PlayerType";

admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createRoom = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "This player is not authenticated!"
    );
  }

  const currPlayerUID = context.auth.uid;
  const currPlayerRef = admin
      .firestore()
      .doc(`players/${currPlayerUID}`) as DocumentReference<Player>;
  const currPlayer = (await currPlayerRef.get()).data();

  if (currPlayer) {
    const roomOfCurrPlayer = currPlayer.roomID;
    if (roomOfCurrPlayer) {
      leaveRoomFn(currPlayerRef);
    }
    const newlyCreatedRoom = (await admin
        .firestore()
        .collection("rooms")
        .add({
          currNumPlayers: 1,
          gameStatus: "Not Ready",
          roomOwnerUID: currPlayerUID,
          roomOwnerName: currPlayer.playerName,
          playersUID: [currPlayerUID],
        })) as DocumentReference<Room>;

    await joinRoomFn(newlyCreatedRoom, currPlayerRef, currPlayer);
    await currPlayerRef.update({roomID: newlyCreatedRoom.id});
  }
});

export const leaveRoom = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "This player is not authenticated!"
    );
  }

  const currPlayerUID = context.auth.uid;
  const currPlayerRef = admin.firestore().doc(`players/${currPlayerUID}`);
  const roomID = await leaveRoomFn(currPlayerRef);
  return roomID;
});

export const joinRoom = functions.https.onCall(
    async (data: string, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "This player is not authenticated!"
        );
      }

      const roomID = data;

      const roomRef = admin
          .firestore()
          .doc(`rooms/${roomID}`) as DocumentReference<Room>;
      const currPlayerUID = context.auth.uid;
      const currPlayerRef = admin
          .firestore()
          .doc(`players/${currPlayerUID}`) as DocumentReference<Player>;
      functions.logger.log({data, roomRef, currPlayerRef});
      await joinRoomFn(roomRef, currPlayerRef);
    }
);

const joinRoomFn = async (
    roomRef: DocumentReference<Room>,
    playerRef: DocumentReference<Player>,
    playerDocData?: DocumentData
) => {
  const playerData = playerDocData || (await playerRef.get()).data();
  const roomData = (await roomRef.get()).data();

  functions.logger.log({roomData, playerData});

  if (!playerData) throw new Error("This player doesn't exists!");
  if (!roomData) throw new Error("This room doesn't exist!");
  const isRoomFull = roomData.currNumPlayers === 4;
  if (isRoomFull) throw new Error("This room is full!");

  await leaveRoomFn(playerRef);

  await admin.firestore().collection(`rooms/${roomRef.id}/players`).add({
    playerName: playerData.playerName,
    isReady: false,
    uid: playerData.uid,
  });
  roomRef.update({
    currNumPlayers: roomData.currNumPlayers + 1,
    playersUID: FieldValue.arrayUnion(playerData.uid),
  });
};

const leaveRoomFn = async (
    playerRef: DocumentReference,
    playerDocData?: DocumentData
) => {
  const playerData = playerDocData || (await playerRef.get()).data();
  const roomID = playerData?.roomID as number;
  if (!roomID) return null;
  await playerRef.update({roomID: null});
  const roomRef = admin.firestore().doc(`rooms/${roomID}`);
  const roomData = (await roomRef.get()).data();
  if (!roomData) return null;
  const isRoomLeftOnePerson = roomData.currNumPlayers === 1;
  const isPlayerAnOwner = roomData.roomOwner === playerData?.uid;
  if (isRoomLeftOnePerson) {
    const playersInRoom = await admin
        .firestore()
        .collection(`rooms/${roomID}/players`)
        .listDocuments();

    playersInRoom.map(async (plyr) => await plyr.delete());
    await roomRef.delete();
    return roomID;
  } else if (isPlayerAnOwner) {
    // To be done
    return null;
  } else {
    // To be done
    return null;
  }
};
