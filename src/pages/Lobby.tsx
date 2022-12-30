/**
 * Hooks
 */
import { useAuthState } from "react-firebase-hooks/auth";
import useLobby from "../hooks/useLobby";
import usePlayer from "../hooks/usePlayer";

/**
 * Utils
 */
import { auth } from "../utils/firebase";

/**
 * Components
 */
import CreateRoomButton from "../components/lobby/CreateRoomButton";
import LeaveRoomButton from "../components/lobby/LeaveRoomButton";
import JoinRoomButton from "../components/lobby/JoinRoomButton";

const Lobby = () => {
  const [user] = useAuthState(auth);
  const { isPlayerInAnyRoom } = usePlayer();
  const {
    rooms,
    createRoom,
    joinRoom,
    leaveRoom,
    isCreatingRoom,
    isJoiningRoom,
    isLeavingRoom,
  } = useLobby();

  const handleCreate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createRoom();
  };

  const handleJoin = (roomID: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // const ref = doc(firestore, `rooms/${roomID}`);
    // const data = (await getDoc(ref)).data();
    // console.log({ data, roomID });
    joinRoom(roomID);
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    leaveRoom();
  };

  console.log({ rooms });

  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 w-50 p-3">
        <h1>Rooms</h1>
        <CreateRoomButton
          handleCreate={handleCreate}
          isCreatingRoom={isCreatingRoom}
          isPlayerInAnyRoom={isPlayerInAnyRoom}
        />
        <div className="room">
          {rooms?.map((rm, index) => (
            <div className="my-5" key={index}>
              <p>{`ROOM ${index}: ${rm.roomID} [${rm.currNumPlayers}] `}</p>
              <p>{`Owner : ${rm.roomOwnerName}`}</p>
              {rm.playersUID.includes(user?.uid as string) ? (
                <LeaveRoomButton
                  handleLeave={handleLeave}
                  isLeavingRoom={isLeavingRoom}
                  isPlayerInAnyRoom={isPlayerInAnyRoom}
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
      </div>
      <div className="h-100 w-50 p-3">
        {/* <pre>{JSON.stringify(isPlayerInAnyRoom)}</pre> */}
        <h1>Top Players</h1>
      </div>
    </div>
  );
};

export default Lobby;
