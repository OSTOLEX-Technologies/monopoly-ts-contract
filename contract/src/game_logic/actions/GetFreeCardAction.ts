import {Action} from "./Action";
import {Board} from "../Board";

export class GetFreeCardAction extends Action {
  constructor(playerId: string) {
    super([], playerId);
  }

  // already implemented
  public doAction(board: Board): void { }

  public getHistoryMessage(): string {
    return "";
  }
}