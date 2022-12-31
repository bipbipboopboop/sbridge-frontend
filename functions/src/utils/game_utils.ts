import { GamePlayer, SimpleGamePlayer } from "../types/GameType";
import { SimpleRoomPlayer } from "../types/PlayerType";
import { Room } from "../types/RoomType";
import { Deck } from "./cards";

const createSimpleGamePlayer = (
  player: SimpleRoomPlayer,
  position: number
): SimpleGamePlayer => {
  return {
    playerName: player.playerName,
    playerUID: player.playerUID,
    position,
    numTricksWon: 0,
  };
};

export const initSimpleGamePlayers = (room: Room): SimpleGamePlayer[] => {
  return room.players.map((plyr, pos) => createSimpleGamePlayer(plyr, pos));
};

export const initGamePlayers = (
  player: SimpleRoomPlayer,
  position: number,
  deck: Deck
): GamePlayer => {
  const startingCardIndex = position * 13;
  const endingCardIndex = startingCardIndex + 13;
  const cardsOnHand = deck.cards.slice(startingCardIndex, endingCardIndex);

  return {
    playerName: player.playerName,
    playerUID: player.playerUID,
    cardsOnHand,
    position: 0,
    numTricksWon: 0,
    tricksWon: [],
  };
};
