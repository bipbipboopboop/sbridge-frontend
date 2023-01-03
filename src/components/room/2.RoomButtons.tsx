import React from "react";
import { Button } from "react-bootstrap";
import ReadyButton from "../buttons/ReadyButton";

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
  console.log({ isGameStartable: props.isGameStartable });
  return (
    <>
      <div className="mt-3">
        <ReadyButton
          handleToggleReady={props.handleToggleReady}
          isPlayerReady={props.isPlayerReady}
        />
        <Button className="mx-3" onClick={props.handleLeave}>
          Leave
        </Button>
      </div>
      <div className="mt-3">
        {props.isPlayerAnOwner && (
          <Button
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
