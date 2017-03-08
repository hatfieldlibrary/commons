/**
 * Created by mspalti on 2/24/17.
 */
/**
 * Actions for area updates. These actions are dispatched from component
 * controllers and effects map functions.
 */
import { Action } from "@ngrx/store";
import { type } from "../shared/ngrx/type";
import {AreaType} from "../shared/data-types/area.type";

export const AreaActionTypes = {
  AREA_LIST: type('[Areas] List All Areas Request'),
  AREA_LIST_SUCCESS: type('[Areas] List All Areas Response'),
  REQUEST_FAILED: type('[Areas] Search Failed')
};
/**
 * Factory for the request all areas action.
 */
export class AreaAction implements Action {
  type = AreaActionTypes.AREA_LIST;

}
/**
 * Factory for the areas received action.
 */
export class AreaActionSuccess implements Action {
  type = AreaActionTypes.AREA_LIST_SUCCESS;
  payload: AreaType[];

  constructor(areas: AreaType[]) {
    this.payload = areas;
  }
}
/**
 * Factory for the areas request failed action.
 */
export class AreaActionFailed implements Action {
  type = AreaActionTypes.REQUEST_FAILED;

  constructor(err) {
    console.log(err)
  }

}
/**
 * Union type.
 */
export type AreaActions = AreaAction | AreaActionSuccess | AreaActionFailed;
