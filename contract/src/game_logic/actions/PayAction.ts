import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";

export class PayAction extends Action {
  public readonly from: string;
  public readonly to: string;
  public readonly amount: number;

  constructor(from: string, to: string, amount: number) {
    super([], "");

    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  doAction(board: Board): void {
    board.bank.payMoney(this.from, this.to, this.amount);
    this.generateHistoryMessage(board);
  }

  private generateHistoryMessage(board: Board) {
    const from = getPlayerById(this.from, board.players);
    const to = getPlayerById(this.to, board.players);

    this.historyMessage =  "(" + from.color + ").{" + from.id + "} paid " +
        "(" + to.color + ").{" + to.id + "}" + this.amount;
  }

  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}