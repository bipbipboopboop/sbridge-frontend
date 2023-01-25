import React from "react";
import Button from "../buttons/Button";

type RoomButtonsProps = {
  isPlayerReady: boolean;
  isPlayerAnOwner: boolean;
  isGameStartable: boolean;
  handleToggleReady: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => Promise<void>;
  handleStartGame: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => Promise<void>;
  handleLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
};

const RoomButtons = (props: RoomButtonsProps) => {
  // TODO: Check why so many rerenders?
  // console.log({ isGameStartable: props.isGameStartable });
  return (
    <>
      <div className="mt-3">
        <Button
          type={!props.isPlayerReady ? "primary" : "secondary"}
          onClick={props.handleToggleReady}
        >
          {!props.isPlayerReady ? "Ready" : "Cancel"}
        </Button>

        <Button type={"danger"} onClick={props.handleLeave}>
          Leave
        </Button>
      </div>
      <div className="mt-3">
        {props.isPlayerAnOwner && (
          <Button
            type={"primary"}
            disabled={!props.isGameStartable}
            onClick={props.handleStartGame}
          >
            Start
          </Button>
        )}
      </div>
    </>
  );
};
export default RoomButtons;
