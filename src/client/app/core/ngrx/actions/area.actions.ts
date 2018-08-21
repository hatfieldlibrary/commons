/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

/**
 * Created by mspalti on 2/24/17.
 */
/**
 * Actions for areas updates. These actions are dispatched from component
 * controllers and effects map functions.
 */
import {Action} from './action.interface';
import {type} from '../type';
import {AreaType} from '../../data-types/area.type';
import {AreaFilterType} from '../../data-types/area-filter.type';
import {FieldFilterType} from '../..//data-types/field-filter.type';

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
    console.log(err)
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
