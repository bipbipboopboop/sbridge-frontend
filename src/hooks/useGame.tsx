import { doc, DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";

import { firestore } from "../utils/firebase";
import usePlayer from "./usePlayer";

const useGame = () => {
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

  return {
    room,

    topPlayer,
    leftPlayer,
    rightPlayer,
    me,

    currTurn,
    isMyTurn,

    playerToBid,
    highestBid,
  };
};

export default useGame;
