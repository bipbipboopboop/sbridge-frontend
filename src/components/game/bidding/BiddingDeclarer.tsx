import { SimpleRoomPlayer } from "../../../types/PlayerType";
import { BidType, BidValue, Suit } from "../../../utils/bids";

type BiddingDeclarerProps = {
  isMyTurn: boolean;
  highestBid: BidType | null | undefined;
  playerToBid: SimpleRoomPlayer | undefined;
  selectedBidValue: BidValue | null;
  selectedSuitValue: Suit | "NT" | null;
};
const BiddingDeclarer = (props: BiddingDeclarerProps) => {
  const {
    isMyTurn,
    highestBid,
    playerToBid,
    selectedBidValue,
    selectedSuitValue,
  } = props;
  return (
    <>
      {isMyTurn && (
        <p className="d-flex justify-content-center">{`Your turn to bid!`}</p>
      )}
      {!isMyTurn && (
        <p className="d-flex justify-content-center">{`Waiting for Player ${playerToBid?.playerName} to bid`}</p>
      )}
      {highestBid && (
        <p className="p-0 m-0">{`${highestBid.value} ${highestBid.suit}`}</p>
      )}

      {selectedBidValue && (
        <p>{`Your bid : ${selectedBidValue}${selectedSuitValue || ""}`}</p>
      )}
    </>
  );
};

export default BiddingDeclarer;
