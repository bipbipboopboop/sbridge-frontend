import { RoomPlayer } from "./PlayerType";

// export type RoomType = {
//   roomID: string;
//   currNumPlayers: number;
//   roomOwnerUID: string;
//   roomOwnerName: string;
//   gameStatus: string;
//   playersUID: string[];
// };

export type Room = {
  roomID: string;
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  currNumPlayers: number;
  players: RoomPlayer[];
  playersUID: string[];
};
