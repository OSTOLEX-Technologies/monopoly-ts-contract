import {Tile, TileType} from "./tiles/Tile";
import {Player} from "./Player";
import {PropertyCard} from "./cards/PropertyCard";
import {RailroadsCard} from "./cards/RailroadsCard";
import {UtilitiesCard} from "./cards/UtilitiesCard";
import {getPropertyCards, getRailroadsCards, getUtilitiesCards} from "./GameConfig";
import {getPlayerById} from "./Utils";
import {Card, CardType} from "./cards/Card";

export class Bank {
  private tiles: Array<Tile>;
  public players: Array<Player>;
  private readonly propertyCards: Array<PropertyCard>;
  private readonly railroadsCards: Array<RailroadsCard>;
  private readonly utilitiesCards: Array<UtilitiesCard>;

  constructor(tiles: Array<Tile>, players: Array<Player>) {
    this.tiles = tiles;
    this.players = players;
    this.propertyCards = getPropertyCards();
    this.railroadsCards = getRailroadsCards();
    this.utilitiesCards = getUtilitiesCards();

    this.deletePurchasedCards();
  }

  private deletePurchasedCards() {
    this.players.forEach((player) => {
      player.propertyCards.forEach((propertyCard) => {
        this.removePropertyCardById(propertyCard.getId());
      });
      player.railroadsCards.forEach((railroadsCard) => {
        this.removeRailroadCardById(railroadsCard.getId());
      });
      player.utilitiesCards.forEach((utilitiesCard) => {
        this.removeUtilityCard(utilitiesCard.getId());
      });
    });
  }

  public collectMoney(playerId: string, amount: number) {
    let player = getPlayerById(playerId, this.players);
    player.increaseBalance(amount);
  }

  public payMoney(from: string, to: string, amount: number) {
    if (from == "bank") {
      this.collectMoney(to, amount);
      return;
    }

    if (to != "bank") {
      let toPlayer = getPlayerById(to, this.players);
      toPlayer.increaseBalance(amount);
    }

    let player = getPlayerById(from, this.players);
    player.decreaseBalance(amount);
  }

  public transferCard(fromPlayerId: string, toPlayerId: string, cardId: string, cardType: CardType) {
    const fromPlayer = getPlayerById(fromPlayerId, this.players);
    const toPlayer = getPlayerById(toPlayerId, this.players);

    let card;
    let cardIdx;
    switch (cardType) {
      case CardType.Property:
        cardIdx = this.propertyCards.findIndex((c) => c.getId() == cardId);
        card = this.propertyCards[cardIdx];
        if (card.isMortgage) throw new Error("The card is mortgage");
        fromPlayer.propertyCards.splice(cardIdx, 1);
        toPlayer.propertyCards.push(card);
        break;
      case CardType.RailRoad:
        cardIdx = this.railroadsCards.findIndex((c) => c.getId() == cardId);
        card = this.railroadsCards[cardIdx];
        if (card.isMortgage) throw new Error("The card is mortgage");
        fromPlayer.railroadsCards.splice(cardIdx, 1);
        toPlayer.railroadsCards.push(card);
        break;
      case CardType.Utility:
        cardIdx = this.utilitiesCards.findIndex((c) => c.getId() == cardId);
        card = this.utilitiesCards[cardIdx];
        if (card.isMortgage) throw new Error("The card is mortgage");
        fromPlayer.utilitiesCards.splice(cardIdx, 1);
        toPlayer.utilitiesCards.push(card);
        break;
      default:
        throw new Error(cardType + "cannot be exchanged");
    }
  }

  public buyHouse(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const cardIdx = player.propertyCards.findIndex(
      (card: PropertyCard) => cardId === card.getId()
    );
    const cardPlayer = player.propertyCards[cardIdx];

    if (cardPlayer.hasHotel()) {
      console.log('you already have hotel')
      return;
    } else if (cardPlayer.hasFourHouses()) {
      player.decreaseBalance(cardPlayer.getHotelCost());
    } else {
      player.decreaseBalance(cardPlayer.getHouseCost());
    }

    cardPlayer.increaseHouses();
  }

  public buyPropertyCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const playerPos = player.getPosition();
    const cardToBuy = this.removePropertyCardById(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.propertyCards.push(...cardToBuy);
    this.tiles[playerPos].setOwner(player);
  }

  private removePropertyCardById(cardId: string): Array<PropertyCard> {
    const cardIdx = this.propertyCards.findIndex(
      (card: PropertyCard) => card.getId() == cardId
    );
    return this.propertyCards.splice(cardIdx, 1);
  }

  public buyRailroadCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const position = player.getPosition();
    let cardToBuy = this.removeRailroadCardById(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.railroadsCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  private removeRailroadCardById(cardId: string): Array<RailroadsCard> {
    const cardIdx = this.railroadsCards.findIndex(
      (card: RailroadsCard) => card.getId() == cardId
    );
    return this.railroadsCards.splice(cardIdx, 1);
  }

  public buyUtilityCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const position = player.getPosition();
    let cardToBuy = this.removeUtilityCard(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.utilitiesCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  private removeUtilityCard(cardId: string): Array<UtilitiesCard> {
    const cardIdx = this.utilitiesCards.findIndex(
      (card: UtilitiesCard) => card.getId() == cardId
    );
    return this.utilitiesCards.splice(cardIdx, 1);
  }

    public getBalance(playerId: string) {
        let player = getPlayerById(playerId, this.players);
        return player.getBalance();
    }

    public mortgage(playerId: string, cardId: string) {
      const card = this.getPlayerPropertyCard(playerId, cardId);
      const player = getPlayerById(playerId, this.players);

      if (card.isMortgage) {
        throw new Error("The card is already mortgage");
      }

      player.increaseBalance(card.mortgage);
      card.isMortgage = true;
    }

    private getPlayerPropertyCard(playerId: string, cardId: string) {
      const player = getPlayerById(playerId, this.players);

      const card = player.propertyCards.find(
          (card: PropertyCard) => card.getId() == cardId
      );

      if (card == undefined) {
        throw new Error("Card not found");
      }

      return card;
    }

    public redeem(playerId: string, cardId: string) {
      const card = this.getPlayerPropertyCard(playerId, cardId);
      const player = getPlayerById(playerId, this.players);

      if (!card.isMortgage) {
        throw new Error("Card is not mortgage");
      }
      if (player.getBalance() < card.mortgage) {
        throw new Error("Not enough balance");
      }

      player.decreaseBalance(card.mortgage);
      card.isMortgage = false;
    }

    public getCardTiledByName(cardName: string, tileType: TileType, ownerId: string | undefined) {
      if (ownerId == undefined) {
        return this.findCardTileByNameInBank(cardName, tileType);
      }

      const player = getPlayerById(ownerId, this.players);

      return player.getCardTileByName(cardName, tileType);
    }

    private findCardTileByNameInBank(cardName: string, tileType: TileType) {
      let card: Card | undefined = undefined;
      switch (tileType) {
        case TileType.City:
          card = this.propertyCards.find((card) => card.getTitle() == cardName);
          break;
        case TileType.Utility:
          card = this.utilitiesCards.find((card) => card.getTitle() == cardName);
          break;
        case TileType.RailRoad:
          card = this.railroadsCards.find((card) => card.getTitle() == cardName);
          break;
      }

      return card;
    }
}