import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

export const deletePlayer = functions.https.onCall((data, context) => {
  return null;
});

// https://stackoverflow.com/questions/71363950/cannot-deploy-firebase-cloud-functions-because-functions-lib-index-js-does-not
