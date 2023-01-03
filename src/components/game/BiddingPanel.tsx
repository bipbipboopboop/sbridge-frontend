import { Button, Card } from "react-bootstrap";

import useBid from "../../hooks/useBid";
import { Bid, Suit } from "../../utils/bids";

const BiddingPanel = () => {
  const {
    isMyTurn,
    highestBid,
    playerToBid,

    selectedBidValue,
    selectedSuitValue,

    handleBid,
    handlePass,

    setSelectedBidValue,
    setSelectedSuitValue,
  } = useBid();

  return (
    <Card className="p-3" style={{ width: "70vh", height: "50vh" }}>
      {isMyTurn && (
        <p className="d-flex justify-content-center">{`Your turn to bid!`}</p>
      )}
      {!isMyTurn && (
        <p className="d-flex justify-content-center">{`Waiting for Player ${playerToBid?.playerName} to bid`}</p>
      )}
      {highestBid ? (
        <p className="p-0 m-0">{`${highestBid.value} ${highestBid.suit}`}</p>
      ) : (
        ""
      )}
      {isMyTurn && (
        <Card.Body>
          <div className="d-flex my-1">
            <Button className="mx-1" onClick={handlePass}>
              Pass
            </Button>
            {selectedBidValue && selectedSuitValue && (
              <Button onClick={handleBid}>Bid</Button>
            )}
          </div>
          <div className="my-1">
            <pre>{JSON.stringify({ selectedBidValue, selectedSuitValue })}</pre>
            {[1, 2, 3, 4, 5, 6].map((bidValue) => {
              const thisBid = new Bid("NT", bidValue, false);
              const highestBidInstance =
                highestBid && new Bid(highestBid.suit, highestBid.value, false);
              const clickable = highestBidInstance
                ? thisBid.canOutbid(highestBidInstance)
                : true;
              return (
                <Button
                  className="mx-1"
                  key={bidValue}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    setSelectedBidValue(bidValue);
                  }}
                  disabled={!clickable}
                >
                  {bidValue}
                </Button>
              );
            })}
          </div>
          <div className="my-1">
            {selectedBidValue &&
              ["♣", "♦", "♥", "♠", "NT"].map((suit, suitValue) => {
                const thisBid = new Bid(suit as Suit, selectedBidValue, false);
                const highestBidInstance =
                  highestBid &&
                  new Bid(highestBid.suit, highestBid.value, false);
                const clickable = highestBidInstance
                  ? thisBid.canOutbid(highestBidInstance)
                  : true;
                return (
                  <Button
                    className="mx-1"
                    key={suitValue + 1}
                    disabled={!clickable}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      setSelectedSuitValue(suit);
                    }}
                  >
                    {suit}
                  </Button>
                );
              })}
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default BiddingPanel;
