import { Button } from "react-bootstrap";
import { RoomPlayer } from "../../types/PlayerType";

type RoomPlayerListProps = {
  roomPlayers: RoomPlayer[];
  roomOwnerUID: string;
  isPlayerAnOwner: boolean;
};

const RoomPlayersList = (props: RoomPlayerListProps) => {
  return (
    <div>
      {props.roomPlayers?.map((rmPlayer, index) => {
        const isRoomOwner = rmPlayer.playerUID === props.roomOwnerUID;
        return (
          <div className="my-5" key={index}>
            {`Player ${rmPlayer.playerName} ${isRoomOwner ? "👑" : ""} - ${
              rmPlayer.isReady ? "Ready" : "Not Ready"
            }`}
            {props.isPlayerAnOwner && <Button>Kick</Button>}
          </div>
        );
      })}
    </div>
  );
};

export default RoomPlayersList;
