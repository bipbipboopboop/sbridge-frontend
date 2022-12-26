import { PlayerType } from "./PlayerType";

export type RoomType = {
  roomID: string;
  currNumPlayers: number;
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  playersUID: [string];
};
