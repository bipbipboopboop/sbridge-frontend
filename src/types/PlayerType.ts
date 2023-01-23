import { CardType } from "./CardType";
// https://stackoverflow.com/questions/70861528/firebase-9-with-react-typescript-how-do-i-change-the-querysnapshot-types
export type Player = {
  uid: string; // player's uid
  playerName: string; // player's name
  roomID: string; // default : publicLobby
};

// For room docs : room.players
export type SimplePlayer = {
  playerName: string;
  playerUID: string;
};

// For room.biddingPhase and room.gamePhase
export type SimpleRoomPlayer = {
  playerName: string;
  playerUID: string;
  numTricksWon: number;
  position: number;
  numCardsOnHand: number;
};

export type RoomPlayer = {
  playerUID: string;
  playerName: string;
  isReady: boolean;

  position: number | null;
  cardsOnHand: CardType[] | null;

  numTricksWon: number;
  tricksWon: CardType[][];
};
