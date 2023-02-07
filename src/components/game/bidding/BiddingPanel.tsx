import { Card as BootstrapCard } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import useBid from "../../../hooks/useBid";

import { Bid, BidValueArray, SuitArray } from "../../../utils/bids";
import Button from "../../buttons/Button";
// aaron@carro.co

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
      <BootstrapCard.Body>
        {!isMyTurn && (
          <div className="text-center">
            <h3>{playerToBid?.playerName} is bidding</h3>
            <BeatLoader />
            {highestBid?.suit && highestBid?.value && (
              <div>
                <p>
                  Highest Bid:{highestBid?.value}
                  {highestBid?.suit}
                </p>
              </div>
            )}
          </div>
        )}
        {isMyTurn && (
          <>
            <h4>Your turn to bid!</h4>
            <div className="d-flex my-1">
              <div className="mx-1">
                <Button type={"danger"} onClick={handlePass}>
                  Pass
                </Button>
              </div>
              {selectedBidValue && selectedSuitValue && (
                <Button type={"primary"} onClick={handleBid}>
                  Bid
                </Button>
              )}
            </div>

            <div className="nes-table-responsive">
              <table className="nes-table is-bordered is-centered">
                <thead>
                  <tr>
                    {BidValueArray.map((bidValue) => {
                      const thisBid = new Bid({ suit: "NT", value: bidValue }); // Assuming this bid can take the highest suit.
                      const highestBidInstance = new Bid(highestBid);
                      const clickable = thisBid.canOutbid(highestBidInstance);
                      // console.log({ highestBidInstance });
                      const isThisSelected = selectedBidValue === thisBid.value;
                      return (
                        <th key={bidValue}>
                          <Button
                            type={isThisSelected ? "primary" : "secondary"}
                            className="mx-1"
                            onClick={handleSelectBid(bidValue)}
                            disabled={!clickable}
                          >
                            {bidValue}
                          </Button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {selectedBidValue &&
                      SuitArray.map((suit, suitValue) => {
                        const thisBid = new Bid({
                          suit,
                          value: selectedBidValue,
                        });
                        const highestBidInstance = new Bid(highestBid);
                        const clickable = thisBid.canOutbid(highestBidInstance);
                        const isThisClicked =
                          selectedSuitValue === thisBid.suit;
                        return (
                          <td key={suitValue + 1}>
                            <Button
                              type={isThisClicked ? "primary" : "secondary"}
                              className="mx-1"
                              disabled={!clickable}
                              onClick={handleSelectSuit(suit)}
                            >
                              {suit}
                            </Button>
                          </td>
                        );
                      })}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default BiddingPanel;
