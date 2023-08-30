import {Player} from "../Player";
import {Action} from "../Actions/Action";
import {PropertyCard} from "../Cards/PropertyCard";
import {RailroadsCard} from "../Cards/RailroadsCard";
import {UtilitiesCard} from "../Cards/UtilitiesCard";
import {ICardRent} from "../Cards/ICardRent";
import {PayAction} from "../Actions/PayAction";
import {PayRentAction} from "../Actions/PayRentAction";

export abstract class Tile {
  public readonly type: TileType;
  public readonly name: string;
  private owner: Player | null;
  private players: Array<Player>;

  protected constructor(name: string, owner: Player | null, players: Array<Player>, type: TileType) {
    this.type = type;
    this.name = name;
    this.owner = owner;
    this.players = players;
  }

  public getOwnerId(): string {
    if (this.owner != null) {
      return this.owner.getId();
    }

    throw new Error("Tile hasn't owner");
  }

  public hasOwner(): boolean {
    return this.owner != null;
  }

  public setOwner(owner: Player) {
    this.owner = owner;
  }

  public getPayRentAction(playerId: string, dice: Array<number>): Action {
    if (this.owner == null) {
      throw new Error("This type of tile cannot be owned by players: " + this.type);
    }

    const rent = this.getRent(dice);
    return new PayRentAction(playerId, this.name, rent, this.owner.getId());
  }

  private getRent(dice: Array<number>): number {
    if (this.owner == null) {
      throw new Error("This type of tile cannot be owned by players: " + this.type);
    }

    let card: ICardRent | undefined = undefined;
    let quantityOfCards = 0;

    switch (this.type) {
      case TileType.City:
        card = this.owner.propertyCards.find((card: PropertyCard) => card.getTitle() == this.name);
        quantityOfCards = 1;
        break;
      case TileType.RailRoad:
        card = this.owner.railroadsCards.find((card: RailroadsCard) => card.getTitle() == this.name);
        quantityOfCards = this.owner.railroadsCards.length;
        break;
      case TileType.Utility:
        card = this.owner.utilitiesCards.find((card: UtilitiesCard) => card.getTitle() == this.name);
        quantityOfCards = this.owner.utilitiesCards.length;
        break;
      default:
        throw new Error("This type of tile cannot be owned by players: " + this.type);
    }

    if (card == undefined) {
      throw new Error("Cannot find the card");
    }

    return card.getRent(quantityOfCards, dice);
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(playerId: string) {
    this.players = this.players.filter((player: Player) => playerId != player.getId());
  }
}

export enum TileType {
  "Go",
  "City",
  "RailRoad",
  "Utility",
  "Parking",
  "Visit",
  "Jail",
  "Chance",
  "Community",
  "Tax",
}