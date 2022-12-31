import * as functions from "firebase-functions";
import { BiddingPhase } from "../types/GameType";

import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import { Deck } from "../utils/cards";
import { initSimpleGamePlayers } from "../utils/game_utils";

import {
  checkIfRoomContainsPlayer,
  checkIsPlayerHasRoom,
  checkIsPlayerRoomExist,
  checkPlayerAccessPrivilege,
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

  const { roomRef, room } = await checkPlayerAccessPrivilege(context);

  const isPlayerAnOwner = room.roomOwnerUID === context.auth.uid;
  if (!isPlayerAnOwner)
    throw HTTPError(
      "permission-denied",
      "You do not have permission to start the game."
    );

  const isGameStartable =
    // room.currReadyPlayersUID.length === 4 && room.gameStatus === "Not Ready";
    room.currReadyPlayersUID.length === 4; // For debugging only
  if (!isGameStartable)
    throw HTTPError("permission-denied", `Game can't be started!`);

  await roomRef.update({ gameStatus: "Bidding" });
  const [ref, data] = await getDocRefAndData<Room>(`rooms/${roomRef.id}`);
  console.log("startGame - Updated gameStatus");

  const deck = new Deck();
  deck.shuffle();
  console.log({ ref, data: JSON.stringify(data), deck: JSON.stringify(deck) });

  const biddingPhase: BiddingPhase = {
    currHighestBid: null,
    players: initSimpleGamePlayers(room),
    turn: 0,
  };

  const gameRef = await roomRef.collection("games").add(biddingPhase);
});
