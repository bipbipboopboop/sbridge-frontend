/**
 * Hooks
 */

import { useAuthState } from "react-firebase-hooks/auth";
import useLobby from "../hooks/useLobby";
import usePlayer from "../hooks/usePlayer";
import { auth } from "../utils/firebase";

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

  const handleJoin = async (
    e: React.MouseEvent<HTMLElement>,
    roomID: string
  ) => {
    e.preventDefault();
    // const ref = doc(firestore, `rooms/${roomID}`);
    // const data = (await getDoc(ref)).data();
    // console.log({ data, roomID });

    await joinRoom(roomID);
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
        <div className="room">
          {rooms?.map((rm, index) => (
            <div className="my-5" key={index}>
              <p>{`ROOM ${index}: ${rm.roomID} [${rm.currNumPlayers}] `}</p>
              <p>{`Owner : ${rm.roomOwnerName}`}</p>
              {rm.playersUID.includes(user?.uid as string) ? (
                <button
                  className="btn btn-primary"
                  onClick={handleLeave}
                  disabled={isLeavingRoom || !isPlayerInAnyRoom}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleJoin(e, rm.roomID)}
                  disabled={isJoiningRoom}
                >
                  {`Join ${rm.playersUID.includes(user?.uid as string)}`}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-100 w-50 p-3">
        <pre>{JSON.stringify(isPlayerInAnyRoom)}</pre>
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={isCreatingRoom || isPlayerInAnyRoom}
        >
          Create
        </button>
        <button
          className="btn btn-primary"
          onClick={handleLeave}
          disabled={isLeavingRoom || !isPlayerInAnyRoom}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default Lobby;
