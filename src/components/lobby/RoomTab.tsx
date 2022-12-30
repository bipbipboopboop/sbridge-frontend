import { User } from "firebase/auth";
import { Room } from "../../types/RoomType";
import JoinRoomButton from "./JoinRoomButton";
import LeaveRoomButton from "./LeaveRoomButton";

type RoomTabProps = {
  room: Room;
  index: number;
  user: User;
};

const RoomTab = (props: RoomTabProps) => {
  const { room, index, user } = props;
  return (
    // <div className="my-5">
    //   <p>{`ROOM ${index}: ${room.roomID} [${room.currNumPlayers}] `}</p>
    //   <p>{`Owner : ${room.roomOwnerName}`}</p>
    //   {room.playersUID.includes(user?.uid as string) ? (
    //     <LeaveRoomButton
    //       handleLeave={handleLeave}
    //       isLeavingRoom={isLeavingRoom}
    //       isPlayerInAnyRoom={isPlayerInAnyRoom}
    //     />
    //   ) : (
    // //     <JoinRoomButton
    // //       handleJoin={handleJoin(room.roomID)}
    // //       isJoiningRoom={isJoiningRoom}
    // //     />
    // //   )}
    // </div>
    true
  );
};

export default RoomTab;
