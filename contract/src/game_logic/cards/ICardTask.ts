import {Action} from "../actions/Action";
import {Player} from "../Player";

export interface ICardTask {
  doTask(playerId: string, players: Array<Player>): Action;
}