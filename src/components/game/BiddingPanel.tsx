import { Button, Card } from "react-bootstrap";
import useGame from "../../hooks/useGame";

const BiddingPanel = () => {
  const { room, isMyTurn, highestBid, playerToBid } = useGame();

  return (
    <>
      {room && (
        <Card className="p-3" style={{ width: "50vh", height: "30vh" }}>
          {isMyTurn && (
            <p className="d-flex justify-content-center">{`Your turn to bid!`}</p>
          )}
          {!isMyTurn && (
            <p className="d-flex justify-content-center">{`Waiting for Player ${playerToBid?.playerName} to bid`}</p>
          )}
          {highestBid ? <p>{`${highestBid.value} ${highestBid.suit}`}</p> : ""}
          {isMyTurn && (
            <Card.Body>
              <div className="my-1">
                <Button className="mx-1">Pass</Button>
              </div>
              <div className="my-1">
                <Button className="mx-1">1</Button>
                <Button className="mx-1">2</Button>
                <Button className="mx-1">3</Button>
                <Button className="mx-1">4</Button>
                <Button className="mx-1">5</Button>
              </div>
              <div className="my-1">
                <Button className="mx-1">♣</Button>
                <Button className="mx-1">♦</Button>
                <Button className="mx-1">♥</Button>
                <Button className="mx-1">♠</Button>
                <Button className="mx-1">NT</Button>
              </div>
            </Card.Body>
          )}
        </Card>
      )}
    </>
  );
};

export default BiddingPanel;
