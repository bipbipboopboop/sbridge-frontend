type JoinRoomProps = {
  handleCreate: (e: React.MouseEvent<HTMLElement>) => void;
  isCreatingRoom: boolean;
  isPlayerInAnyRoom: boolean;
};

const CreateRoomButton = (props: JoinRoomProps) => {
  const { handleCreate, isCreatingRoom, isPlayerInAnyRoom } = props;
  return (
    <button
      className="btn btn-primary"
      onClick={handleCreate}
      disabled={isCreatingRoom || isPlayerInAnyRoom}
    >
      Create
    </button>
  );
};

export default CreateRoomButton;
