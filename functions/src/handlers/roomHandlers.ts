import * as functions from "firebase-functions";
import { RoomPlayer } from "../types/PlayerType";

import {
  checkIfRoomContainsPlayer,
  checkIsPlayerHasRoom,
  checkIsPlayerRoomExist,
  togglePlayerReady,
  updateReadyPlayersUID,
} from "../utils/player_utils";
// import * as admin from "firebase-admin";

import { getDocRefAndData, HTTPError } from "../utils/utils";

export const toggleReady = functions.https.onCall(async (_: void, context) => {
  if (!context.auth)
    throw HTTPError("failed-precondition", "This player is not authenticated!");

  // Throw Error if player has no room. Return player if otherwise
  const player = (await checkIsPlayerHasRoom(context))[1];

  // Defensive code, player's room should exist if player is in a room.
  // Throw Error if player's room doesn't exist. Return player's room if otherwise
  const [roomRef, room] = await checkIsPlayerRoomExist(player);

  // Defensive code, player's room should contain player.
  // Throw error if player's room doesn't contain player.
  checkIfRoomContainsPlayer(room, player);

  const [roomPlayerRef, roomPlayer] = await getDocRefAndData<RoomPlayer>(
    `rooms/${player.roomID}/players/${player.uid}`
  );
  // Toggle ready in roomPlayer doc
  await togglePlayerReady(roomPlayerRef, roomPlayer);
  // Insert/Remove player from ready
  await updateReadyPlayersUID(room, player, roomRef);
});

export const startGame = functions.https.onCall(async (_: void, context) => {
  if (!context.auth)
    throw HTTPError("failed-precondition", "This player is not authenticated!");
});
