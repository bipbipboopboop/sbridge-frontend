import { SimpleRoomPlayer } from "./PlayerType";

export type Room = {
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  currNumPlayers: number;
  currReadyPlayersUID: string[];
  players: SimpleRoomPlayer[];
  playersUID: string[];
};
