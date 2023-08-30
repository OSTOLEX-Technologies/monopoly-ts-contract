import {Action} from "../Actions/Action";
import {Player} from "../Player";

export interface ICardTask {
  doTask(playerId: string, players: Array<Player>): Action;
}