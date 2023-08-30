import {Player} from "../Player";
import {Tile, TileType} from "./Tile";

export class CityTile extends Tile {
  private price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players, TileType.City);

    this.price = price;
  }
}