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
  currReadyPlayersUID: string[];
  players: { playerName: string; playerUID: string }[];
  playersUID: string[];
};
