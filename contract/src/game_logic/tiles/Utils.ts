import {Action} from "../Actions/Action";
import {CommunityAction} from "../Actions/CommunityAction";
import {GetOutOfJailAction} from "../Actions/GetOutOfJailAction";

export function isGetOutOfJailFree(taskAction: Action): boolean {
  if (taskAction instanceof CommunityAction) {
    taskAction.getActions().forEach((action) => {
      if (action instanceof GetOutOfJailAction) {
        return true;
      }
    });
  }

  return false;
}