import {Tile, TileType} from "./Tile";
import {Player} from "../Player";
import {ITileTask} from "./ITileTask";
import {Action} from "../Actions/Action";
import {ChanceCard} from "../Cards/ChanceCard";
import {getRandomInt} from "../Utils";
import {isGetOutOfJailFree} from "./Utils";

export class ChanceTile extends Tile implements ITileTask {
  private readonly cards: Array<ChanceCard>;

  constructor(name: string, players: Array<Player>, cards: Array<ChanceCard>) {
    super(name, null, players, TileType.Chance);

    this.cards = cards;
  }

  public doTask(playerId: string, players: Array<Player>): Action {
    const rndCardIdx = getRandomInt(0, this.cards.length);
    const rndCard = this.cards[rndCardIdx];
    const chanceAction = rndCard.doTask(playerId, players);

    // Remove card if Get Out of Jail Free
    if (isGetOutOfJailFree(chanceAction)) {
      this.cards.splice(rndCardIdx, 1);
    }

    return chanceAction;
  }
}