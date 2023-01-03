import { doc, DocumentReference } from "firebase/firestore";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import { BidType, Suit } from "../utils/bids";

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

  const [selectedBidValue, setSelectedBidValue] = useState<number | null>(null);
  const [selectedSuitValue, setSelectedSuitValue] = useState<string | null>(
    null
  );
  const [castBid] = useHttpsCallable<BidType, void>(functions, "castBid");
  const handleBid = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await castBid({
      suit: selectedSuitValue as Suit,
      value: selectedBidValue as number,
      isPass: false,
    });
  };

  const handlePass = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await castBid({
      suit: "NT",
      value: 1, // TODO: Remove this potato test
      isPass: true,
    });
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

    setSelectedBidValue, // TODO: Refactor this crap
    setSelectedSuitValue,
  };
};

export default useBid;
