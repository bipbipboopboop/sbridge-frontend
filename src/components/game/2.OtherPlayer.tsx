import { Card } from "react-bootstrap";
import { SimpleRoomPlayer } from "../../types/PlayerType";

type OtherPlayerProps = {
  otherPlayer: SimpleRoomPlayer | undefined;
};

const OtherPlayer = (props: OtherPlayerProps) => {
  const { otherPlayer } = props;

  return (
    <div className="d-flex p-2">
      <div>
        <p className="mt-2">{otherPlayer?.playerName}</p>
      </div>
      <Card
        style={{
          width: "12vh",
          height: "17vh",
          // minWidth: "12vh",
          // minHeight: "17vh",
        }}
      >
        <Card.Body className="d-flex justify-content-center align-items-center">
          {otherPlayer?.numCardsOnHand}
        </Card.Body>
      </Card>
    </div>
  );
};

export default OtherPlayer;
