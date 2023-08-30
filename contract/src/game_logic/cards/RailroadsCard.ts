import {Card, CardType} from "./Card";
import {ICardRent} from "./ICardRent";

export class RailroadsCard extends Card implements ICardRent {
  public readonly logo: string;
  private readonly price: number;
  private readonly rent: number;
  private readonly ifTwoCards: number;
  private readonly ifThreeCards: number;

  constructor(
    id: string,
    title: string,
    color: string,
    price: number,
    rent: number,
    logo: string,
    ifTwoCards: number,
    ifThreeCards: number,
    mortgage: number) {
    super(id, title, CardType.RailRoad, mortgage);

    this.price = price;
    this.rent = rent;
    this.logo = logo;
    this.ifTwoCards = ifTwoCards;
    this.ifThreeCards = ifThreeCards;
  }

  public getPrice() {
    return this.price;
  }

  public getRent(quantityOfCards: number) {
    if (quantityOfCards === 1) {
      return this.rent;
    } else if (quantityOfCards === 2) {
      return this.ifTwoCards;
    } else {
      return this.ifThreeCards;
    }
  }
}