import {Card, CardType} from "./Card";
import {ICardTask} from "./ICardTask";
import {Action} from "../Actions/Action";
import {getPlayerById} from "../Utils";
import {Player} from "../Player";
import {PropertyCard} from "./PropertyCard";
import {PayAction} from "../Actions/PayAction";
import {MoveAction} from "../Actions/MoveAction";
import {GoToJailAction} from "../Actions/GoToJailAction";
import {GoAction} from "../Actions/GoAction";
import {GetFreeCardAction} from "../Actions/GetFreeCardAction";
import {CommunityAction} from "../Actions/CommunityAction";

export class CommunityChestCard extends Card implements ICardTask {
  private readonly description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title, CardType.Community, 0);

    this.description = description;
  }

  doTask(playerId: string, players: Array<Player>): Action {
    let player = getPlayerById(playerId, players);

    let actions: Array<Action> = [];
    switch (this.id) {
      case 'community-101': // Advance to "Go". (Collect $200)
        actions.push(new MoveAction(playerId, 0, []), new GoAction([], playerId));
        break;
      case 'community-102': // Collect $100
        actions.push(new PayAction("bank", playerId, 100));
        break;
      case 'community-103': // Get Out of Jail Free
        player.communityChestCards.push(this);
        actions.push(new GetFreeCardAction(playerId));
        break;
      case 'community-104': // Collect $10
        actions.push(new PayAction("bank", playerId, 10));
        break;
      case 'community-105': // Collect $200
        actions.push(new PayAction("bank", playerId, 200));
        break;
      case 'community-106': // get $50
        actions.push(new PayAction("bank", playerId, 50));
        break;
      case 'community-107': // Collect $20
        actions.push(new PayAction("bank", playerId, 20));
        break;
      case 'community-108': // Receive for services $25.
        actions.push(new PayAction("bank", playerId, 25));
        break;
      case 'community-109': // You inherit $100
        actions.push(new PayAction("bank", playerId, 100));
        break;
      case 'community-110': // Collect $100
        actions.push(new PayAction("bank", playerId, 100));
        break;
      case 'community-111': // Collect $50 from every player for opening night seats
        players.forEach((p: Player) => {
          if (p.getId() != player.getId()) {
            actions.push(new PayAction(p.getId(), player.getId(), 50));
          }
        });
        break;
      case 'community-112': // Pay $50
        actions.push(new PayAction(playerId, "bank", 50));
        break;
      case 'community-113': // Pay hospital $100
        actions.push(new PayAction(playerId, "bank", 100));
        break;
      case 'community-114': // Pay school tax of $150
        actions.push(new PayAction(playerId, "bank", 150));
        break;
      case 'community-115': // You are assessed for street repairs: Pay $40 per house and $115 per hotel you own
        let homeCount = 0;
        let hotelCount = 0;
        player.propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          }
          else {
            homeCount += card.getNumberOfHouses();
          }
        });
        const tax = homeCount * 40 + hotelCount * 115;
        actions.push(new PayAction(playerId, "bank", tax));
        break;
      case 'community-116': // Go to Jail
        actions.push(new GoToJailAction([], playerId));
        break;
      default:
        console.log("Community task card not found");
    }

    return new CommunityAction(playerId, actions, this.description);
  }
}