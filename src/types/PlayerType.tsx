export type Player = {
  uid: string; // player's uid
  playerName: string; // player's name
  roomID: string; // default : publicLobby
  // https://stackoverflow.com/questions/70861528/firebase-9-with-react-typescript-how-do-i-change-the-querysnapshot-types
};

export type RoomPlayer = {
  playerName: string;
  uid: string;
  isReady: boolean;
};
