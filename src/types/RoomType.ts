// export type RoomType = {
//   roomID: string;
//   currNumPlayers: number;
//   roomOwnerUID: string;
//   roomOwnerName: string;
//   gameStatus: string;
//   playersUID: string[];
// };

import { BiddingState, GameState } from "./GameType";
import { SimplePlayer } from "./PlayerType";

export type Room = {
  roomID: string;
  roomOwnerUID: string;
  roomOwnerName: string;
  gameStatus: string;
  currNumPlayers: number;
  currReadyPlayersUID: string[];
  players: SimplePlayer[];
  playersUID: string[];

  biddingPhase: BiddingState | null;
  gameState: GameState | null;
};
