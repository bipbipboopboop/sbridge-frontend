import { useState } from "react";

import { useHttpsCallable } from "react-firebase-hooks/functions";

import { Bid, BidType, BidValue, BidSuit } from "../utils/bids";

import { functions } from "../utils/firebase";
import usePlayer from "./usePlayer";

/**
 * Hook for handling bidding.
 */
const useBid = () => {
  const { playerData, room, me } = usePlayer();

  // Check whos turn is it to bid.
  const currTurn = room?.biddingPhase?.turn;
  const playerToBid = room?.biddingPhase?.players.find(
    (plyr) => plyr.position === currTurn
  );

  // Check whether this player can bid.
  const isMyTurn = playerToBid?.playerUID === playerData?.uid;

  const highestBid = room?.biddingPhase?.currHighestBid; // TODO : Add table

  const [selectedBidValue, setSelectedBidValue] = useState<BidValue | null>(
    null
  );
  const [selectedSuitValue, setSelectedSuitValue] = useState<BidSuit | null>(
    null
  );

  const handleSelectBid =
    (bidValue: BidValue) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedSuitValue(null);
      setSelectedBidValue(bidValue);
    };

  const handleSelectSuit =
    (suit: BidSuit) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedSuitValue(suit);
    };

  const [castBid] = useHttpsCallable<BidType, void>(functions, "castBid");
  const handleBid = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await castBid({
      suit: selectedSuitValue,
      value: selectedBidValue,
    });
  };

  const handlePass = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const passBid = new Bid(null);
    await castBid(passBid.toBidType());
  };

  return {
    me,
    room,

    currTurn,
    playerToBid,
    isMyTurn,
    highestBid,

    selectedBidValue,
    selectedSuitValue,
    handleBid,
    handlePass,

    handleSelectBid,
    handleSelectSuit,
  };
};

export default useBid;
