import {Tile, TileType} from "./Tile";
import {Player} from "../Player";

export class VisitTile extends Tile {
  constructor(name: string, players: Array<Player>, owner: Player | null) {
    super(name, owner, players, TileType.Visit);
  }
}