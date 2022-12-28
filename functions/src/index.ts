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

export const deletePlayer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    console.log({ status: "error", code: 401, message: "Not signed in" });
    return { status: "error", code: 401, message: "Not signed in" };
  }
  const playerUID = context.auth.uid;
  const playerRef = admin.firestore().doc(`players/${playerUID}`);
  console.log({ playerRef: JSON.stringify(playerRef) });
  await playerRef.delete();
  return {
    status: "success",
    code: 401,
    message: "Successfully deleted player",
  };
});
