import {Card, CardType} from "./Card";
import {ICardRent} from "./ICardRent";

export class PropertyCard extends Card implements ICardRent {
  public readonly price: number;
  public readonly logo: string;
  public readonly rent: number;
  public readonly oneHouse: number;
  public readonly twoHouses: number;
  public readonly threeHouses: number;
  public readonly fourHouses: number;
  public readonly hotel: number;
  public readonly houseCost: number;
  public readonly hotelCost: number;
  public readonly quantity: number;
  private houses: number;
  private hotels: number;

  constructor(
    id: string,
    title: string,
    logo: string,
    price: number,
    rent: number,
    oneHouse: number,
    twoHouses: number,
    threeHouses: number,
    fourHouses: number,
    hotel: number,
    mortgage: number,
    houseCost: number,
    hotelCost: number,
    quantity: number,
    houses: number,
    hotels: number) {
    super(id, title, CardType.Property, mortgage);

    this.price = price;
    this.logo = logo;
    this.rent = rent;
    this.oneHouse = oneHouse;
    this.twoHouses = twoHouses;
    this.threeHouses = threeHouses;
    this.fourHouses = fourHouses;
    this.hotel = hotel;
    this.houseCost = houseCost;
    this.hotelCost = hotelCost;
    this.quantity = quantity;
    this.houses = houses;
    this.hotels = hotels;
  }

  public getHotelCost() {
    return this.hotelCost;
  }

  public getHouseCost() {
    return this.houseCost;
  }

  public hasHotel() {
    return this.houses == 5;
  }

  public hasFourHouses() {
    return this.houses == 4;
  }

  public getNumberOfHouses() {
    return this.houses;
  }

  public increaseHouses() {
    this.houses++;
  }

  public getPrice() {
    return this.price;
  }

  public getRent() {
    if (this.houses == 0) {
      return this.rent;
    } else if (this.houses === 1) {
      return this.oneHouse;
    } else if (this.houses === 2) {
      return this.twoHouses;
    } else if (this.houses === 3) {
      return this.threeHouses;
    } else if (this.houses === 4) {
      return this.fourHouses;
    } else {
      return this.hotel;
    }
  }
}