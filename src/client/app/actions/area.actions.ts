/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
import {AreaListItemType} from "../shared/data-types/area-list.type";

export const AreaActionTypes = {
  AREA_LIST: type('[Areas] List Areas Request'),
  AREA_LIST_SUCCESS: type('[Areas] List All Areas Response'),
  REQUEST_FAILED: type('[Areas] Search Failed'),
  AREA_INFORMATION: type('[Areas] Information for current area'),
  AREA_INFORMATION_SUCCESS: type('[Areas] Update area information')
};


/**
 * Factory for the request all areaList action.
 */
export class AreaAction implements Action {
  type = AreaActionTypes.AREA_LIST;

  constructor(public payload: string = null) {
  }

}
/**
 * Factory for the areaList received action.
 */
export class AreaActionSuccess implements Action {
  type = AreaActionTypes.AREA_LIST_SUCCESS;

  constructor(public payload: AreaListItemType[]) {
    console.log(payload)
  }
}
/**
 * Factory for the areaList request failed action.
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

  constructor(public payload: string) {
  }

}

/**
 * Factory for the action used to update area information.
 */
export class AreaInformationSuccess implements Action {
  type = AreaActionTypes.AREA_INFORMATION_SUCCESS;

  constructor(public payload: AreaType) {}
}

/**
 * Union type.
 */
export type AreaActions = AreaAction | AreaActionSuccess | AreaActionFailed | AreaInformation | AreaInformationSuccess;
