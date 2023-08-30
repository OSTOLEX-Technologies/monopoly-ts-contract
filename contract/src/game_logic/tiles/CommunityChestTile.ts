import {Tile, TileType} from "./Tile";
import {Player} from "../Player";
import {ITileTask} from "./ITileTask";
import {Action} from "../Actions/Action";
import {CommunityChestCard} from "../Cards/CommunityChestCard";
import {getRandomInt} from "../Utils";
import {isGetOutOfJailFree} from "./Utils";

export class CommunityChestTile extends Tile implements ITileTask {
  private readonly cards: Array<CommunityChestCard>;

  constructor(name: string, players: Array<Player>, cards: Array<CommunityChestCard>) {
    super(name, null, players, TileType.Community);

    this.cards = cards;
  }

  public doTask(playerId: string, players: Array<Player>): Action {
    const rndCardIdx = getRandomInt(0, this.cards.length);
    const rndCard = this.cards[rndCardIdx];
    const communityAction = rndCard.doTask(playerId, players);

    // Remove card if Get Out of Jail Free
    if (isGetOutOfJailFree(communityAction)) {
      this.cards.splice(rndCardIdx, 1);
    }

    return communityAction;
  }
}