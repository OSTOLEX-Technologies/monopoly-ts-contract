import {Tile, TileType} from "./Tile";
import {Player} from "../Player";
import {Action} from "../Actions/Action";
import {PayAction} from "../Actions/PayAction";

export class TaxTile extends Tile {
  private readonly price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players, TileType.Tax);

    this.price = price;
  }

  public getPayTaxAction(playerId: string): Action {
    return new PayAction(playerId, "bank", this.price);
  }
}