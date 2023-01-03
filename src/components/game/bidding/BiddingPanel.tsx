import { Button, Card } from "react-bootstrap";

import useBid from "../../../hooks/useBid";

import { Bid, BidValueArray, SuitArray } from "../../../utils/bids";
import BiddingDeclarer from "./BiddingDeclarer";

const BiddingPanel = () => {
  const {
    isMyTurn,
    highestBid,
    playerToBid,

    selectedBidValue,
    selectedSuitValue,

    handleBid,
    handlePass,
    handleSelectBid,
    handleSelectSuit,
  } = useBid();

  return (
    <Card className="p-3" style={{ width: "70vh", height: "50vh" }}>
      <BiddingDeclarer
        isMyTurn={isMyTurn}
        highestBid={highestBid}
        playerToBid={playerToBid}
        selectedBidValue={selectedBidValue}
        selectedSuitValue={selectedSuitValue}
      />
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
            {BidValueArray.map((bidValue) => {
              const thisBid = new Bid({ suit: "NT", value: bidValue }); // Assuming this bid can take the highest suit.
              const highestBidInstance = new Bid(highestBid);
              const clickable = thisBid.canOutbid(highestBidInstance);
              // console.log({ highestBidInstance });
              return (
                <Button
                  className="mx-1"
                  key={bidValue}
                  onClick={handleSelectBid(bidValue)}
                  disabled={!clickable}
                >
                  {bidValue}
                </Button>
              );
            })}
          </div>
          <div className="my-1">
            {selectedBidValue &&
              SuitArray.map((suit, suitValue) => {
                const thisBid = new Bid({ suit, value: selectedBidValue });
                const highestBidInstance = new Bid(highestBid);
                const clickable = thisBid.canOutbid(highestBidInstance);
                return (
                  <Button
                    className="mx-1"
                    key={suitValue + 1}
                    disabled={!clickable}
                    onClick={handleSelectSuit(suit)}
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
