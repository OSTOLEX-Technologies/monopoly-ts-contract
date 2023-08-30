import {Action} from "./Action";
import {Board} from "../Board";

export class DeclareBankruptcyAction extends Action {
    private readonly playerColor: string;

    constructor(playerId: string, playerColor: string) {
        super([], playerId);

        this.playerColor = playerColor;
    }

    public doAction(board: Board): void {
    }

    public getHistoryMessage(): string {
        return "(" + this.playerColor + ").{" + this.playerId + "} declared bankrupt";
    }
}