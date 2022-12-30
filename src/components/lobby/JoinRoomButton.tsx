type JoinRoomProps = {
  handleJoin: (e: React.MouseEvent<HTMLElement>) => void;
  isJoiningRoom: boolean;
};

const JoinRoomButton = (props: JoinRoomProps) => {
  const { handleJoin, isJoiningRoom } = props;
  return (
    <button
      className="btn btn-primary"
      onClick={handleJoin}
      disabled={isJoiningRoom}
    >
      Join
      {/* ${rm.playersUID.includes(user?.uid as string)} */}
    </button>
  );
};

export default JoinRoomButton;
