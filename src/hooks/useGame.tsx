import usePlayer from "./usePlayer";

// TODO : Refactor this by removing some code from useBid
const useGame = () => {
  const { playerData, room, me } = usePlayer();

  const players = room?.biddingPhase?.players;
  const otherPlayers = players?.filter(
    (plyr) => plyr.position !== me?.position
  );

  console.log({ otherPlayers });
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
