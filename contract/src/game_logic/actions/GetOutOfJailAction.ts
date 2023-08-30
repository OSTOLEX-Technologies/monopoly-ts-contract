import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";

export class GetOutOfJailAction extends Action{
  constructor(dice: Array<number>, playerId: string) {
    super(dice, playerId);
  }

  public doAction(board: Board): void {
    board.getOutOfJail(this.playerId);
    this.generateHistoryMessage(board);
  }

  private generateHistoryMessage(board: Board) {
    const player = getPlayerById(this.playerId, board.players);
    this.historyMessage = "(" + player.color + ").{" + player.id + "} got out of jail";
  }

  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}