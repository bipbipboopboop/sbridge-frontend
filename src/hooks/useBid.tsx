import { useState } from "react";

import { useHttpsCallable } from "react-firebase-hooks/functions";

import { Bid, BidType, BidValue, Suit } from "../utils/bids";

import { functions } from "../utils/firebase";
import usePlayer from "./usePlayer";

const useBid = () => {
  const { playerData, room, me } = usePlayer();

  // Check whos turn is it to bid.
  const currTurn = room?.biddingPhase?.turn;
  const playerToBid = room?.biddingPhase?.players.find(
    (plyr) => plyr.position === currTurn
  );

  // Check whether this player can bid.
  const isMyTurn = playerToBid?.playerUID === playerData?.uid;
  const players = room?.biddingPhase?.players;

  const myPosition = me?.position as number;
  const leftPlayer = players?.find(
    (plyr) => plyr.position === (myPosition + 1) % 4
  );
  const topPlayer = players?.find(
    (plyr) => plyr.position === (myPosition + 2) % 4
  );
  const rightPlayer = players?.find(
    (plyr) => plyr.position === (myPosition + 3) % 4
  );

  const highestBid = room?.biddingPhase?.currHighestBid; // TODO : Add table

  const [selectedBidValue, setSelectedBidValue] = useState<BidValue | null>(
    null
  );
  const [selectedSuitValue, setSelectedSuitValue] = useState<
    Suit | "NT" | null
  >(null);

  const handleSelectBid =
    (bidValue: BidValue) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedSuitValue(null);
      setSelectedBidValue(bidValue);
    };

  const handleSelectSuit =
    (suit: Suit | "NT") => (e: React.MouseEvent<HTMLElement>) => {
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
    leftPlayer,
    topPlayer,
    rightPlayer,
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
