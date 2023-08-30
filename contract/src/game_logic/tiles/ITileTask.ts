import {Action} from "../Actions/Action";
import {Player} from "../Player";

export interface ITileTask {
  doTask(playerId: string, players: Array<Player>): Action;
}