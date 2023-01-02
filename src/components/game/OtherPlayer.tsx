import { Card } from "react-bootstrap";
import { SimpleRoomPlayer } from "../../types/PlayerType";

type OtherPlayerProps = {
  otherPlayer: SimpleRoomPlayer | undefined;
};

const OtherPlayer = (props: OtherPlayerProps) => {
  const { otherPlayer } = props;
  return (
    <div>
      <p>{otherPlayer?.playerName}</p>
      <Card
        style={{
          width: "6em",
          height: "8em",
          minWidth: "6em",
          minHeight: "8em",
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
