import {Player} from "./player";
import {PieceColor} from "../constants";

export function throwDice() {
  return [
    getRandomInt(1, 7),
    getRandomInt(1, 7),
  ];
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min)
}

export function getPlayerById(playerId: string, players: Array<Player>): Player {
  let result = players.find((x) => x.getId() == playerId);

  if (result != undefined) {
    return result;
  }

  throw new Error("Player with id " + playerId + " not found");
}

export function getPieceColor(color: string) {
  switch (color) {
    case "red": return PieceColor.Red;
    case "blue": return PieceColor.Blue;
    case "orange": return PieceColor.Orange;
    case "green": return PieceColor.Green;
    case "purple": return PieceColor.Purple;
    case "pink": return PieceColor.Pink;
    case "yellow": return PieceColor.Yellow;
    case "navy": return PieceColor.Navyblue;
    default: return PieceColor.Red;
  }
}