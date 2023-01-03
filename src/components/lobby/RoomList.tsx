import { User } from "firebase/auth";
import React from "react";
import { Room } from "../../types/RoomType";
import JoinRoomButton from "../buttons/JoinRoomButton";
import LeaveRoomButton from "../buttons/LeaveRoomButton";

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
            <LeaveRoomButton
              handleLeave={handleLeave}
              isLeavingRoom={isLeavingRoom}
              isPlayerInAnyRoom={props.isPlayerInAnyRoom}
            />
          ) : (
            <JoinRoomButton
              handleJoin={handleJoin(rm.roomID)}
              isJoiningRoom={isJoiningRoom}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
