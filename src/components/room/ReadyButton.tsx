import React from "react";

type ReadyButtonProps = {
  isPlayerReady: boolean;
  handleToggleReady: (e: React.MouseEvent<HTMLElement>) => void;
};

const ReadyButton = (props: ReadyButtonProps) => {
  const { isPlayerReady, handleToggleReady } = props;
  return (
    <button className="btn btn-primary" onClick={handleToggleReady}>
      {isPlayerReady ? "I'm Not Ready :(" : "I'm Ready!"}
    </button>
  );
};

export default ReadyButton;
