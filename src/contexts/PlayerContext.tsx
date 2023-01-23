import { DocumentReference } from "firebase/firestore";
import { createContext, ReactNode } from "react";
import usePlayer from "../hooks/usePlayer";
import { Player, RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";

export const PlayerContext = createContext<PlayerContextProp | null>(null);

type PlayerContextProp = {
  playerData: Player | null | undefined;
  isLoadingPlayer: boolean;
  isPlayerInAnyRoom: boolean;
  logOut: (e: React.FormEvent<HTMLElement>) => Promise<void>;
  roomPlayerRef: DocumentReference<RoomPlayer> | null | undefined;
  roomRef: DocumentReference<Room> | null | undefined;
  room: Room | undefined;
  me: RoomPlayer | undefined;
};

export const PlayerProvider = (props: { children: ReactNode }) => {
  const data = usePlayer();
  return (
    <PlayerContext.Provider value={data}>
      {props.children}
    </PlayerContext.Provider>
  );
};
