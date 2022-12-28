import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentReference } from "firebase-admin/firestore";

import { Room } from "./types/RoomType";
import { Player } from "./types/PlayerType";

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
    throw new functions.https.HttpsError(
      "failed-precondition",
      "This player is not authenticated!"
    );
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
      throw new functions.https.HttpsError(
        "failed-precondition",
        "This player is not authenticated!"
      );
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

// export const joinRoom = functions.https.onCall((roomID: string, context) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "failed-precondition",
//       "This player is not authenticated!"
//     );
//   }
//   const currPlayerUID = context.auth.uid;
//     const currPlayerRef = admin.firestore().doc(`players/${currPlayerUID}`);
//     const currPlayer = (await currPlayerRef.get()).data();

//     if (currPlayer) {
//       const roomOfCurrPlayer = currPlayer.roomID;
//       if (roomOfCurrPlayer) {
//         leaveRoomFn(currPlayerRef);
//       }
//       const newlyCreatedRoom = await admin
//           .firestore()
//           .collection("rooms")
//           .add({
//             currNumPlayers: 1,
//             gameStatus: "Not Ready",
//             roomOwnerUID: currPlayerUID,
//             roomOwnerName: currPlayer.playerName,
//             playersUID: [currPlayerUID],
//           });
//       const newlyCreatedRoomID = newlyCreatedRoom.id;
//       await admin
//           .firestore()
//           .collection(`rooms/${newlyCreatedRoomID}/players`)
//           .add({
//             playerName: currPlayer.playerName,
//             isReady: false,
//             uid: currPlayerUID,
//           });
//       await currPlayerRef.update({roomID: newlyCreatedRoomID});
// });

export const leaveRoom = functions.https.onCall(
  async (roomID: string, context) => {
    if (!context.auth)
      throw HTTPError(
        "failed-precondition",
        "This player is not authenticated!"
      );

    // Check if player is in any room or not
    const [playerRef, plyr] = await getDocRefAndData<Player>(
      `players/${context.auth.uid}`
    );
    const player = plyr as Player;
    const isPlayerInRoom = player.roomID !== null;
    if (!isPlayerInRoom)
      throw HTTPError("failed-precondition", "Player is not room");

    // Check if room exists or not
    const [roomRef, room] = await getDocRefAndData<Room>(
      `rooms/${player.roomID}`
    );
    if (!room) throw HTTPError("not-found", "This room doesn't exist!");

    // Check if player is in this room or not
    const isRoomHasPlayer = room.playersUID.includes(player.uid);
    if (!isRoomHasPlayer)
      throw HTTPError("failed-precondition", "Player not in this room");

    // Delete room from player
    const updatedPlayer = { ...player, roomID: null } as Player;
    playerRef.update(updatedPlayer);

    // Delete player from room.
    // Check what to do after player leaves.
    // If room only has player. Delete the room
    if (room.currNumPlayers == 1) await roomRef.delete();
    // If the room has multiple player, make the next player Owner, then leave the room.
    else {
      let newRoom: Room;
      newRoom = {
        ...room,
        players: room.players.filter(
          (rmPlyr) => rmPlyr.playerUID === player.uid
        ),
        playersUID: room.playersUID.filter(
          (rmPlyrUID) => rmPlyrUID !== player.uid
        ),
      };
      newRoom.roomOwnerUID = newRoom.players[0].playerUID;
      newRoom.roomOwnerName = newRoom.players[0].playerName;
      roomRef.update(newRoom);
    }
  }
);

const getDocRefAndData = async <T>(
  path: string
): Promise<[ref: DocumentReference<T>, data: T | null]> => {
  const ref = admin.firestore().doc(path) as DocumentReference<T>;
  const data = (await ref.get()).data() as T | null;
  return [ref, data];
};

const HTTPError = (
  errorCode: functions.https.FunctionsErrorCode,
  msg: string
) => {
  return new functions.https.HttpsError(errorCode, msg);
};
