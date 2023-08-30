import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";

export class CommunityAction extends Action {
  private readonly actions: Array<Action>;
  public readonly description: string;

  constructor(playerId: string, actions: Array<Action>, description: string) {
    super([], playerId);

    this.actions = actions;
    this.description = description;
  }

  public getActions(): Array<Action> {
    return this.actions;
  }

  public doAction(board: Board): void {
    this.actions.forEach((action) => {
        action.doAction(board);
    });

    this.generateHistoryMessage(board);
  }

  private generateHistoryMessage(board: Board) {
    const player = getPlayerById(this.playerId, board.players);

    this.historyMessage = "(" + player.color + ").{" + player.id + "} got a community treasure card: " + this.description;
  }

  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}