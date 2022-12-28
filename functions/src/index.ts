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

/**
 * Adds a player instance in Firestore. Used immediately after User authentication.
 * Creates a player instance with the following fields :
 * @field playerName{string}
 * @field uid{string}
 * @field roomID{string}
 * @param playerName{string} Name of the player
 */
export const addPlayer = functions.https.onCall(
  async (playerName: string, context) => {
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
  }
);
