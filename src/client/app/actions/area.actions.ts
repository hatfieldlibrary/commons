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

export interface IdentifersPayload {
  areas: AreaType[];
  areaId: string
}

export const AreaActionTypes = {
  AREA_LIST: type('[Areas] List All Areas Request'),
  AREA_LIST_SUCCESS: type('[Areas] List All Areas Response'),
  REQUEST_FAILED: type('[Areas] Search Failed'),
  AREA_INFORMATION: type('[Areas] Information for current area'),
  AREA_INFORMATION_UPDATE: type('[Areas] Update area information')
};
/**
 * Factory for the request all areas action.
 */
export class AreaAction implements Action {
  type = AreaActionTypes.AREA_LIST;
  payload: string;

  constructor(public areaId: string) {
    this.payload = areaId;
  }

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
  payload: void;
  constructor(err:string) {
    console.log(err)
  }

}
/**
 * Factory for the action used to initialize collection
 * information with load of the area list.
 */
export class AreaInformation implements Action {
  type = AreaActionTypes.AREA_INFORMATION;
  payload: IdentifersPayload;

  constructor(public areaList: AreaType[], public id: string) {
    this.payload = {
      areas: areaList,
      areaId: id
    }
  }

}

/**
 * Factory for the action used to update area information.
 */
export class AreaInformationUpdate implements Action {
  type = AreaActionTypes.AREA_INFORMATION_UPDATE;
  payload: string;

  constructor(public areaId: string ) {
    this.payload = areaId;
  }
}

/**
 * Union type.
 */
export type AreaActions = AreaAction | AreaActionSuccess | AreaActionFailed | AreaInformation | AreaInformationUpdate;
