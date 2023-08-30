import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";

export class GoToJailAction extends Action {
  constructor(dice: Array<number>, playerId: string) {
    super(dice, playerId);
  }
  public doAction(board: Board): void {
    board.goToJail(this.playerId);
    this.getHistoryMessage();
  }

  private generateHistoryMessage(board: Board) {
    const player = getPlayerById(this.playerId, board.players);

    this.historyMessage = "(" + player.color + ").{" + player.id + "} went to jail";
  }

  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}