export type Room = {
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
