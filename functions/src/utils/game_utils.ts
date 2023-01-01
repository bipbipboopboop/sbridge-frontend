import { DocumentReference } from "firebase-admin/firestore";
import {
  RoomPlayer,
  SimplePlayer,
  SimpleRoomPlayer,
} from "../types/PlayerType";
import { Room } from "../types/RoomType";
import { Deck } from "./cards";
import { getCollectionRef } from "./utils";

const createSimpleRoomPlayer = (
  player: SimplePlayer,
  position: number
): SimpleRoomPlayer => {
  return {
    playerName: player.playerName,
    playerUID: player.playerUID,
    position,
    numTricksWon: 0,
  };
};

/**
 *
 * For populating room.biddingPhase
 * @param room
 * @returns
 */
export const initSimpleRoomPlayers = (room: Room): SimpleRoomPlayer[] => {
  return room.players.map((plyr, pos) => createSimpleRoomPlayer(plyr, pos));
};

const initRoomPlayer = (
  player: SimpleRoomPlayer,
  position: number,
  deck: Deck
): RoomPlayer => {
  const startingCardIndex = position * 13;
  const endingCardIndex = startingCardIndex + 13;
  const serializedDeck = deck.cards.map((card) => card.toFirestore());
  const cardsOnHand = serializedDeck.slice(startingCardIndex, endingCardIndex);

  return {
    playerName: player.playerName,
    playerUID: player.playerUID,
    isReady: true,
    cardsOnHand,
    position,
    numTricksWon: 0,
    tricksWon: [],
  };
};

/**
 * For populating roomPlayers
 * @param room
 * @param deck
 * @returns
 */
export const initRoomPlayers = async (
  roomRef: DocumentReference<Room>,
  deck: Deck
) => {
  const roomPlayersCollection = getCollectionRef<RoomPlayer>(
    `rooms/${roomRef.id}/roomPlayers`
  );

  const roomPlayersRef = await roomPlayersCollection.listDocuments();

  roomPlayersRef.forEach(async (rmPlyrRef, pos) => {
    const roomPlayerSnapshot = await rmPlyrRef.get();
    const roomPlayerRef = roomPlayerSnapshot.ref;
    const roomPlayer = roomPlayerSnapshot.data() as RoomPlayer;

    const startingDeckIndex = pos * 13;
    const endDeckIndex = startingDeckIndex + 13;

    roomPlayerRef.update({
      playerUID: roomPlayer.playerUID,
      playerName: roomPlayer.playerName,
      isReady: roomPlayer.isReady,

      position: pos,
      cardsOnHand: deck.cards
        .slice(startingDeckIndex, endDeckIndex)
        .map((card) => card.toFirestore()),
      numTricksWon: 0,
      tricksWon: [],
    });
  });
};

/**
 * 0, 13
 * 13, 26
 * 26, 39
 * 39, 52
 */
