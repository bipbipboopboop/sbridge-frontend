export type Player = {
  playerName: string;
  roomID: string | null;
  uid: string;
};

export type RoomPlayer = {
  playerName: string;
  uid: string;
  isReady: boolean;
};
