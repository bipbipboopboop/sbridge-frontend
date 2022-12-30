export type Room = {
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  currNumPlayers: number;
  currReadyPlayersUID: string[];
  players: {
    playerName: string;
    playerUID: string;
  }[];
  playersUID: string[];
};
