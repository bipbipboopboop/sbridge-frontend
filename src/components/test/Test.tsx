import React, { useState } from "react";
import { RoomType } from "../../types/RoomType";

type Props = {};

const Game = (props: Props) => {
  const [rooms, setRooms] = useState<RoomType[]>([
    { roomID: "room1_id", status: "Not Ready", players: [] },
    { roomID: "room2_id", status: "Not Ready", players: [] },
  ]);
  return (
    <div className="w-100 h-100 d-flex">
      <div className="h-100 w-50 p-3">
        <h1>Rooms</h1>
        <div className="room">
          {rooms.map((rm) => (
            <div className="my-5">
              <p>
                {`ROOM : ${rm.roomID} - ${rm.status}`}{" "}
                <button className="btn btn-primary">Join</button>
              </p>
              <p>{`Players [${rm.players.length}] : `}</p>
              <ul>
                {rm.players.map((plyr) => (
                  <li>{`${plyr.playerName}`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="h-100 w-50 p-3">
        <button className="btn btn-primary">Create</button>
      </div>
    </div>
  );
};

export default Game;
