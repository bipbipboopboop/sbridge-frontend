import { useState } from "react";

import { doc, DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";

import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import { Bid, BidType, BidValue, Suit } from "../utils/bids";

import { firestore, functions } from "../utils/firebase";
import usePlayer from "./usePlayer";

const useBid = () => {
  const { playerData } = usePlayer();
  const roomPlayerRef =
    playerData &&
    (doc(
      firestore,
      `rooms/${playerData?.roomID}/roomPlayers/${playerData?.uid}`
    ) as DocumentReference<RoomPlayer>);

  const roomRef =
    playerData &&
    (doc(firestore, `rooms/${playerData?.roomID}`) as DocumentReference<Room>);
  const [room] = useDocumentData<Room>(roomRef);

  const [me] = useDocumentData<RoomPlayer>(roomPlayerRef);

  const players = room?.biddingPhase?.players;
  const otherPlayers = players?.filter(
    (plyr) => plyr.position !== me?.position
  );

  const leftPlayer =
    me &&
    otherPlayers?.find(
      (plyr) => plyr.position === ((me.position as number) + 1) % 4
    );

  const topPlayer =
    me &&
    otherPlayers?.find(
      (plyr) => plyr.position === ((me.position as number) + 2) % 4
    );

  const rightPlayer =
    me &&
    otherPlayers?.find(
      (plyr) => plyr.position === ((me.position as number) + 3) % 4
    );

  const currTurn = room?.biddingPhase?.turn;
  const playerToBid = room?.biddingPhase?.players.find(
    (plyr) => plyr.position === currTurn
  );
  const isMyTurn = playerToBid?.playerUID === playerData?.uid;
  const highestBid = room?.biddingPhase?.currHighestBid;

  const [selectedBidValue, setSelectedBidValue] = useState<BidValue | null>(
    null
  );
  const [selectedSuitValue, setSelectedSuitValue] = useState<Suit | null>(null);

  const handleSelectBid =
    (bidValue: BidValue) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setSelectedSuitValue(null);
      setSelectedBidValue(bidValue);
    };

  const handleSelectSuit =
    (suit: Suit) => (e: React.MouseEvent<HTMLElement>) => {
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
