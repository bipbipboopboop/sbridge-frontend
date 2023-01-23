import { Button, Card as BootstrapCard } from "react-bootstrap";

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
    <BootstrapCard className="p-3" style={{ width: "30em", height: "20em" }}>
      <BiddingDeclarer
        isMyTurn={isMyTurn}
        highestBid={highestBid}
        playerToBid={playerToBid}
        selectedBidValue={selectedBidValue}
        selectedSuitValue={selectedSuitValue}
      />
      {isMyTurn && (
        <BootstrapCard.Body>
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
        </BootstrapCard.Body>
      )}
    </BootstrapCard>
  );
};

export default BiddingPanel;
