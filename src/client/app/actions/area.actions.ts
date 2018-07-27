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
 * Actions for areas updates. These actions are dispatched from component
 * controllers and effects map functions.
 */
import {Action} from '../actions/action.interface';
import {type} from '../shared/ngrx/type';
import {AreaType} from '../shared/data-types/area.type';
import {AreaFilterType} from 'app/shared/data-types/area-filter.type';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

export const AreaActionTypes = {
  REQUEST_FAILED: type('[Areas] Search Failed'),
  AREA_INFORMATION: type('[Areas] List for default areas'),
  AREA_INFORMATION_SUCCESS: type('[Areas] Updating area information'),
  AREA_LIST: type('[Areas] List Areas Request'),
  AREA_LIST_SUCCESS: type('[Areas] Areas Response'),
  AREA_LIST_SUBJECT: type('[Areas] List of areas by subject'),
  AREA_LIST_TYPE: type('[Areas] List of areas by type'),
  AREA_LIST_TYPE_SUBJECT: type('[Areas] List of areas by type/subject'),
  AREA_DEFAULT_LIST: type('[Areas] Default area list information')
};

export interface AreaParams {
  typeId: string,
  subjectId: string
}

/**
 * Factory for the action used to initialize area information
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
  constructor(public payload: AreaType) {
  }
}

// used, but really needed?
export class AreaDefaultList implements Action {
  type = AreaActionTypes.AREA_DEFAULT_LIST;
  payload: void;
  constructor() {
  }
}


/**
 * Factory for the request all areas list action.
 */
export class AreaListAction implements Action {
  type = AreaActionTypes.AREA_LIST;
  constructor(public payload: string = null) {
  }

}

/**
 * Factory for the areas list received action. Convert payload from legacy area type to field type.
 */
export class AreaListSuccess implements Action {
  type = AreaActionTypes.AREA_LIST_SUCCESS;
  payload: FieldFilterType[] = [];
  constructor(private areas: AreaFilterType[]) {
    if (areas) {
      areas.forEach((area) => {
        this.payload.push({id: area.id, name: area.title});
      })
    }
  }
}

/**
 * Factory for the areas list request failed action.
 */
export class AreaListActionFailed implements Action {
  type = AreaActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    if (err !== 'test') {
      console.log(err);
    }
  }

}

/**
 * Factory for the action used to request area list by subject
 */
export class AreaListBySubject implements Action {
  type = AreaActionTypes.AREA_LIST_SUBJECT;
  constructor(public payload: string) {
  }

}

/**
 * Factory for the action used request area list by type
 */
export class AreaListByType implements Action {
  type = AreaActionTypes.AREA_LIST_TYPE;
  constructor(public payload: string) {
  }

}

/**
 * Factory for the action used to request area list by subject and type.
 */
export class AreaListByTypeSubject implements Action {
  type = AreaActionTypes.AREA_LIST_TYPE_SUBJECT;
  constructor(public payload: AreaParams) {
  }

}

/**
 * Union type.
 */
export type AreaActions =
  AreaListAction
  | AreaListSuccess
  | AreaListActionFailed
  | AreaInformation
  | AreaInformationSuccess
  | AreaListBySubject
  | AreaListByType
  | AreaListByTypeSubject
  | AreaDefaultList;
