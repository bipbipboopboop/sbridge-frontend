import { User } from "firebase/auth";
import React from "react";
import { Room } from "../../types/RoomType";
import Button from "../buttons/Button";

type RoomListProps = {
  user: User;
  rooms: Room[];

  handleJoin: (
    roomID: string
  ) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  handleLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;

  isJoiningRoom: boolean;
  isLeavingRoom: boolean;
  isPlayerInAnyRoom: boolean;
};

const RoomList = (props: RoomListProps) => {
  const { rooms, handleLeave, handleJoin, isJoiningRoom, isLeavingRoom } =
    props;
  return (
    <div>
      {rooms?.map((rm, index) => (
        <div className="my-5" key={index}>
          <p>{`ROOM ${index}: ${rm.roomID} [${rm.currNumPlayers}] `}</p>
          <p>{`Owner : ${rm.roomOwnerName}`}</p>
          {rm.playersUID.includes(props.user?.uid as string) ? (
            <Button
              type={"danger"}
              onClick={handleLeave}
              disabled={isLeavingRoom || !props.isPlayerInAnyRoom}
            >
              Leave
            </Button>
          ) : (
            <Button
              type={"primary"}
              onClick={handleJoin(rm.roomID)}
              disabled={isJoiningRoom}
            >
              Join
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
