import { PlayerType } from "./PlayerType";

// export type RoomType = {
//   roomID: string;
//   currNumPlayers: number;
//   roomOwnerUID: string;
//   roomOwnerName: string;
//   gameStatus: string;
//   playersUID: string[];
// };

export type RoomType = {
  roomID: string;
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  currNumPlayers: number;
  players: {
    playerName: string;
    playerUID: string;
  }[];
  playersUID: string[];
};
