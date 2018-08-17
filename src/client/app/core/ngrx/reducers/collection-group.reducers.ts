
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

import {CollectionGroupActions, GroupActionTypes} from '../actions/collection-group.actions';
import {FieldFilterType} from '../../data-types/field-filter.type';

export interface State {
  groups: FieldFilterType[];
  loading: boolean;

}

const initialState: State = {
  groups: [],
  loading: false
};

export function reducer(state = initialState, action: CollectionGroupActions): State {

  switch (action.type) {

    case GroupActionTypes.ALL_GROUP_REQUEST: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }

    case GroupActionTypes.GROUPS_ACTION_SUCCESS: {
      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        groups: result,
        loading: false
      });
    }

    case GroupActionTypes.GROUPS_BY_AREA: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }


    case GroupActionTypes.GROUPS_BY_TYPE: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }

    case GroupActionTypes.GROUPS_BY_SUBJECT: {
    return Object.assign({}, state, {
      groups: [],
      loading: true
    });
  }

    case GroupActionTypes.GROUPS_BY_SUBJECT_TYPE: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }

    case GroupActionTypes.GROUPS_BY_AREA_TYPE: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }

    case GroupActionTypes.GROUPS_BY_AREA_SUBJECT: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }

    case GroupActionTypes.GROUPS_BY_AREA_SUBJECT_TYPE: {
      return Object.assign({}, state, {
        groups: [],
        loading: true
      });
    }


    default:
      return state;

  }
}

export const getCollectionGroupList = (state: State) => state.groups;
