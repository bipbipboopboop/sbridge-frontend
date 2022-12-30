import * as functions from "firebase-functions";
import { Player, RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
// import * as admin from "firebase-admin";

import { getDocRefAndData, HTTPError } from "../utils/utils";

export const toggleReady = functions.https.onCall(async (_: void, context) => {
  if (!context.auth)
    throw HTTPError("failed-precondition", "This player is not authenticated!");

  // Check if player is in any room or not
  const player = (
    await getDocRefAndData<Player>(`players/${context.auth.uid}`)
  )[1] as Player;

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

  const [roomPlayerRef, roomPlayer] = await getDocRefAndData<RoomPlayer>(
    `rooms/${player.roomID}/players/${player.uid}`
  );

  // Toggle ready in roomPlayer doc
  await roomPlayerRef.update({ isReady: !roomPlayer?.isReady });

  // Update aggregate field currReadyPlayersUID in room doc
  const isPlayerReady = room.currReadyPlayersUID.includes(player.uid);
  if (isPlayerReady) {
    // If player is ready, remove the player
    const currReadyPlayersUID = removePlayerFromReadyUIDs(room, player);
    await roomRef.update({ currReadyPlayersUID });
  } else {
    // If player is not ready, add the player
    const currReadyPlayersUID = addPlayerToReadyUIDs(room, player);
    await roomRef.update({ currReadyPlayersUID });
  }
});

export const removePlayerFromReadyUIDs = (room: Room, player: Player) => {
  return room.currReadyPlayersUID.filter((plyrUID) => plyrUID !== player.uid);
};

export const addPlayerToReadyUIDs = (room: Room, player: Player) =>
  room.currReadyPlayersUID.concat([player.uid]);
