import * as functions from "firebase-functions";
import {DocumentReference} from "firebase-admin/firestore";
import * as admin from "firebase-admin";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export type PlayerType = {
  uid: string; // player's uid
  playerName: string; // player's name
  roomID: string; // default : publicLobby
  // https://stackoverflow.com/questions/70861528/firebase-9-with-react-typescript-how-do-i-change-the-querysnapshot-types
};

export const addCurrPlayer = functions.https.onCall(
    (data: PlayerType, context) => {
      if (context.auth) {
        admin.firestore().doc(`players/${context.auth.uid}`).set({
          uid: context.auth?.uid,
          playerName: data.playerName,
          roomID: null,
        });
      } else {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "This player is not authenticated!"
        );
      }
    }
);

export const createRoom = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const currPlayerUID = context.auth.uid;
    const currPlayerRef = admin.firestore().doc(`players/${currPlayerUID}`);
    const currPlayerSnapshot = await currPlayerRef.get();
    const currPlayer = currPlayerSnapshot.data();
    if (currPlayer) {
      const roomOfCurrPlayer = currPlayer.roomID;
      if (roomOfCurrPlayer) {
        leaveRoomFn(currPlayerRef);
      }
      const newlyCreatedRoom = await admin
          .firestore()
          .collection("rooms")
          .add({
            currNumPlayers: 1,
            gameStatus: "Not Ready",
            roomOwnerUID: currPlayerUID,
            playersUID: [currPlayerUID],
          });
      const newlyCreatedRoomID = newlyCreatedRoom.id;
      await admin.firestore().collection(`rooms/${newlyCreatedRoomID}`).add({
        playerName: currPlayer.playerName,
        isReady: false,
      });
    }
  } else {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "This player is not authenticated!"
    );
  }
});

export const leaveRoom = functions.https.onCall((data, context) => {
  if (context.auth) {
    const currPlayerUID = context.auth.uid;
    const currPlayerRef = admin.firestore().doc(`players/${currPlayerUID}`);
    leaveRoomFn(currPlayerRef);
  }
});

const leaveRoomFn = async (playerRef: DocumentReference) => {
  const playerData = (await playerRef.get()).data();
  const roomID = playerData?.roomID as number;
  if (!roomID) return null;
  await playerRef.update({roomID: null});
  const roomRef = admin.firestore().doc(`rooms/${roomID}`);
  const roomData = (await roomRef.get()).data();
  if (!roomData) return null;
  const isRoomLeftOnePerson = roomData.currNumPlayers === 1;
  const isPlayerAnOwner = roomData.roomOwner === playerData?.uid;
  if (isRoomLeftOnePerson) {
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

export const deletePlayer = functions.auth.user().onDelete((user, context) => {
  admin.firestore().doc(`players/${user.uid}`).delete();
});
