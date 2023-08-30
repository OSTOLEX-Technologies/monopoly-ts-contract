import {Action} from "./Action";
import {Board} from "../Board";

export class PayRentAction extends Action {
    private readonly cardName: string;
    private readonly rent: number;
    private readonly cardOwnerId: string;

    constructor(playerId: string, cardName: string, rent: number, cardOwnerId: string) {
        super([], playerId);

        this.rent = rent;
        this.cardName = cardName;
        this.cardOwnerId = cardOwnerId;
    }

    public doAction(board: Board): void {
        board.bank.payMoney(this.playerId, this.cardOwnerId, this.rent);
    }

    public getHistoryMessage(playerId: string): string {
        let result = "came to the " + this.cardName + " and you have to pay " + this.cardOwnerId + " " + this.rent;
        if (playerId == this.playerId) {
            result = "You " + result;
        } else {
            result = this.playerId + " " + result;
        }

        return result;
    }
}