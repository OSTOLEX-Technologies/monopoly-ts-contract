export abstract class Card {
    public readonly id: string;
    public readonly title: string;
    public readonly type: CardType;
    public readonly mortgage: number;
    public isMortgage: boolean;
  
    protected constructor(id: string, title: string, type: CardType, mortgage: number) {
      this.id = id;
      this.title = title;
      this.type = type;
      this.mortgage = mortgage;
      this.isMortgage = false;
    }
  
    public getId(): string {
      return this.id;
    }
  
    public getTitle(): string {
      return this.title;
    }
  }
  
  export enum CardType {
    Chance,
    Community,
    Property,
    RailRoad,
    Utility,
  }