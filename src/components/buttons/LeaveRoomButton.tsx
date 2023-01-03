type LeaveRoomProps = {
  handleLeave: (e: React.MouseEvent<HTMLElement>) => void;
  isLeavingRoom: boolean;
  isPlayerInAnyRoom: boolean;
};

const LeaveRoomButton = (props: LeaveRoomProps) => {
  const { handleLeave, isLeavingRoom, isPlayerInAnyRoom } = props;
  return (
    <button
      className="btn btn-primary"
      onClick={handleLeave}
      disabled={isLeavingRoom || !isPlayerInAnyRoom}
    >
      Leave
    </button>
  );
};
export default LeaveRoomButton;
