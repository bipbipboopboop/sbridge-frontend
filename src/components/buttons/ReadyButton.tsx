import React from "react";
import { Button } from "react-bootstrap";

type ReadyButtonProps = {
  isPlayerReady: boolean;
  handleToggleReady: (e: React.MouseEvent<HTMLElement>) => void;
};

/**
 * Button for toggling `isPlayerReady` in `WaitingArea.tsx`
 *
 * @component
 */
const ReadyButton = (props: ReadyButtonProps) => {
  const { isPlayerReady, handleToggleReady } = props;
  return (
    <Button onClick={handleToggleReady}>
      {isPlayerReady ? "Cancel" : "I'm Ready!"}
    </Button>
  );
};

export default ReadyButton;
