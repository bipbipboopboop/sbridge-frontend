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
    <div className="nes-container with-title" style={{ minHeight: "81.5%" }}>
      <p className="title">{`Rooms(${rooms?.length})`}</p>
      <div style={{ maxHeight: "81.5%", overflow: "scroll" }}>
        {rooms?.map((rm, index) => (
          <div
            className="nes-container is-rounded my-5 d-flex justify-content-between"
            key={index}
          >
            {/* <p>{`ROOM ${index}: ${rm.roomID} [${rm.currNumPlayers}] `}</p> */}
            <p className="p-0 m-0">{`${rm.roomOwnerName}'s room`}</p>
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
    </div>
  );
};

export default RoomList;
