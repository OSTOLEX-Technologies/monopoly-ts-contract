import { NearBindgen, NearContract, near, call, view, Vector } from 'near-sdk-js';
import { Game } from './game';

@NearBindgen
class GameContract extends NearContract {
  greeting: string;
  games: Game[]
  
  constructor({message="Hello"}:{message: string}) {
    super();
    this.greeting = message;
    this.games = [];
  }

  default(){ return new GameContract({message: "Hello"}) }

  @call
  set_greeting({ message }: { message: string }): void {
    near.log(`Saving greeting ${message}`);
    this.greeting = message;
  }

  @view
  get_greeting(): string {
    near.log(`The current greeting is ${this.greeting}`);
    return this.greeting;
  }
}
