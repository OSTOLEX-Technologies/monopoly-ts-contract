import {Card, CardType} from "./Card";
import {ICardTask} from "./ICardTask";
import {Action} from "../Actions/Action";
import {Player} from "../Player";
import {getPlayerById} from "../Utils";
import {MoveAction} from "../Actions/MoveAction";
import {GoAction} from "../Actions/GoAction";
import {PropertyCard} from "./PropertyCard";
import {ChanceAction} from "../Actions/ChanceAction";
import {PayAction} from "../Actions/PayAction";
import {GetFreeCardAction} from "../Actions/GetFreeCardAction";
import {GoToJailAction} from "../Actions/GoToJailAction";

export class ChanceCard extends Card implements ICardTask {
  private readonly description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title, CardType.Chance, 0);

    this.description = description;
  }

  doTask(playerId: string, players: Array<Player>): Action {
    let player = getPlayerById(playerId, players);

    let currPosition;
    let newPosition;

    let actions: Array<Action> = [];
    switch (this.getId()) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        actions.push(new MoveAction(playerId, 0, []), new GoAction([], playerId));
        break;
      case 'chance-202':
        currPosition = player.getPosition();
        actions.push(new MoveAction(playerId, 5, []));

        if (currPosition > 5) {
          actions.push(new GoAction([], playerId));
        }

        break;
      case 'chance-203':
        currPosition = player.getPosition();
        actions.push(new MoveAction(playerId, 9, []));

        if (currPosition > 9) {
          actions.push(new GoAction([], playerId));
        }

        break;
      case 'chance-204': // Advance token to the nearest Utility
        currPosition = player.getPosition();
        if (currPosition === 2) {
          newPosition = 13;
        } else {
          newPosition = 27;
        }

        player.setIsNextPayByDice({ isTrue: true, payTo: null });
        actions.push(new MoveAction(playerId, newPosition, []));

        break;
      case 'chance-205': // Advance to the nearest Railroad
        currPosition = player.getPosition();
        if (currPosition === 2) {
          newPosition = 12;
        } else if (currPosition === 14) {
          newPosition = 20;
        } else {
          newPosition = 28;
        }

        actions.push(new MoveAction(playerId, newPosition, []));
        break;
      case 'chance-206': // Bank pays you dividend of $50
        actions.push(new PayAction("bank", playerId, 50))
        break;
      case 'chance-207': // Get out of Jail Free
        actions.push(new GetFreeCardAction(playerId));
        player.chanceCards.push(this);
        break;
      case 'chance-208': // Go Back 3 Spaces
        const posBack = player.getPosition() - 3;
        actions.push(new MoveAction(playerId, posBack, []));
        break;
      case 'chance-209': // Go to Jail
        actions.push(new GoToJailAction([], playerId));
        break;
      case 'chance-210': // Make general repairs on all your property
        let homeCount = 0;
        let hotelCount = 0;
        player.propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          } else {
            homeCount += card.getNumberOfHouses();
          }
        });

        const rent = homeCount * 25 + hotelCount * 100;
        actions.push(new PayAction(playerId, "bank", rent))
        break;
      case 'chance-211': // Pay poor tax of $15
        actions.push(new PayAction(playerId, "bank", 15));
        break;
      case 'chance-212': // collect $200
        const playerPos = player.getPosition();
        if (playerPos > 5) {
          actions.push(new GoAction([], playerId));
        }

        actions.push(new MoveAction(playerId, 5, []));
        break;
      case 'chance-213': // Advance token to Boardwalk
        currPosition = player.getPosition();
        actions.push(new MoveAction(playerId, 29, []));

        if (currPosition > 29) {
          actions.push(new GoAction([], playerId));
        }

        break;
      case 'chance-214': // PAY EACH PLAYER $50
        players.forEach((p: Player) => {
          if (p.getId() != player.getId()) {
            actions.push(new PayAction(player.getId(), p.getId(), 50));
          }
        });
        break;
      case 'chance-215':
        actions.push(new PayAction("bank", playerId, 150));
        break;
      case 'chance-216':
        actions.push(new PayAction("bank", playerId, 100));
        break;
      default:
        console.log("Chance card not found");
    }


    return new ChanceAction(playerId, actions, this.description);
  }
}