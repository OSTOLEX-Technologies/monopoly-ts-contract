import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";

export class GoAction extends Action {
  constructor(dice: Array<number>, playerId: string) {
    super(dice ,playerId);
  }
  doAction(board: Board): void {
    board.bank.collectMoney(this.playerId, 200);
    this.generateHistoryMessage(board);
  }

  private generateHistoryMessage(board: Board) {
    const player = getPlayerById(this.playerId, board.players);
    this.historyMessage = "(" + player.color + ").{" + player.id + "} passed the field go and got 200";
  }
  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}