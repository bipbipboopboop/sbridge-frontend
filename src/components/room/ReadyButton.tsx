import React from "react";
import { Button } from "react-bootstrap";

type ReadyButtonProps = {
  isPlayerReady: boolean;
  handleToggleReady: (e: React.MouseEvent<HTMLElement>) => void;
};

const ReadyButton = (props: ReadyButtonProps) => {
  const { isPlayerReady, handleToggleReady } = props;
  return (
    <Button onClick={handleToggleReady}>
      {isPlayerReady ? "Cancel" : "I'm Ready!"}
    </Button>
    // <button className="btn btn-primary" onClick={handleToggleReady}>
    // </button>
  );
};

export default ReadyButton;
