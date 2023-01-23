import usePlayer from "./usePlayer";

/**
 * Hook for displaying state of game(including bidding).
 */
const useGame = () => {
  const { room, me } = usePlayer();

  const players = room?.gameState?.players || room?.biddingPhase?.players;

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

  return {
    room,
    me,

    topPlayer,
    leftPlayer,
    rightPlayer,
  };
};

export default useGame;
