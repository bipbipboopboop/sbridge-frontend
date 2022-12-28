import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();

/**
 * Deletes a player if they are logged in.
 */
export const deletePlayer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    const result = { status: "error", code: 401, message: "Not signed in" };
    return result;
  }
  const playerUID = context.auth.uid;
  const playerRef = admin.firestore().doc(`players/${playerUID}`);
  console.log({ playerRef: JSON.stringify(playerRef) });
  await playerRef.delete();
  const result = {
    status: "success",
    code: 202,
    message: "Successfully deleted player",
  };
  return result;
});

export const addPlayer = functions.https.onCall(async (playerName, context) => {
  if (!context.auth) {
    const result = { status: "error", code: 401, message: "Not signed in" };
    return result;
  }
  const playerUID = context.auth.uid;
  const playerRef = admin.firestore().doc(`players/${playerUID}`);
  console.log({ playerRef: JSON.stringify(playerRef) });
  await playerRef.set({ playerName, uid: playerUID, roomID: null });
  const result = {
    status: "success",
    code: 201,
    message: "Successfully added player",
  };
  return result;
});
