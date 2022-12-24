import { PlayerType } from "./PlayerType";

export type RoomType = {
  roomID: string;
  players: PlayerType[];
  status: string;
};
