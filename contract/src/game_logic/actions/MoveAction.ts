import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";
import {CommunityChestTile} from "../tiles/CommunityChestTile";
import {ChanceTile} from "../tiles/ChanceTile";
import {TaxTile} from "../tiles/TaxTile";
import {JailTile} from "../tiles/JailTile";
import {GoToJailAction} from "./GoToJailAction";

export class MoveAction extends Action {
  public readonly position: number;

  constructor(playerId: string, position: number, dice: Array<number>) {
    super(dice, playerId);

    this.position = position;
  }

  public doAction(board: Board): Array<Action> {
    if (this.dice.length == 0) {
       board.advancePlayer(this.position, this.playerId);
       return [];
    }

    const actions = board.movePlayerToNewTile(this.dice, this.playerId);

    const player = getPlayerById(this.playerId, board.players);
    const playerPosition = player.getPosition();
    const currTile = board.tiles[playerPosition];

    if (currTile instanceof CommunityChestTile || currTile instanceof ChanceTile) {
      actions.push(currTile.doTask(this.playerId, board.players));
    } else if (currTile instanceof TaxTile) {
      actions.push(currTile.getPayTaxAction(this.playerId));
    } else if (currTile instanceof JailTile) {
      actions.push(new GoToJailAction(this.dice, this.playerId));
    } else if (currTile.hasOwner() && currTile.getOwnerId() != this.playerId) {
      actions.push(currTile.getPayRentAction(this.playerId, this.dice));
    } else if (playerPosition == 24) {
      actions.push(new GoToJailAction(this.dice, this.playerId));
    }

    actions.forEach((action) => {
      action.doAction(board);
    });

    let result = new Array<Action> (this);
    result.push(...actions);

    this.generateHistoryMessage(board);

    return result;
  }

  public getNewPosition() {
    let result = this.position;
    if (this.dice.length != 0) {
      result += this.dice[0] + this.dice[1];
      if (result > 31) {
        result -= 32;
      }
    }

    return result;
  }

  private generateHistoryMessage(board: Board) {
    if (this.dice.length == 0) return;

    const player = getPlayerById(this.playerId, board.players);

    this.historyMessage = "(" + player.color + ").{" + player.id + "} rolled the dice " + this.dice[0] + " and " + this.dice[1];
  }

  public getHistoryMessage(): string {
    return this.historyMessage;
  }
}