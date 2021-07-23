/*
 * action types
 */

import { ReduxEventEnum } from "../enum"


/*
 * action creators
 */

export class Action {
  static setLocationCanBack=(canBack)=>{
    return{
      type: ReduxEventEnum.changeLocationCanBack,
      value: canBack
    }
  }
}
