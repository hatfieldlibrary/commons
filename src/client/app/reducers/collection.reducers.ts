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
 * Created by mspalti on 2/22/17.
 */
import {CollectionActions, CollectionActionTypes} from '../actions/collection.actions';
import {CollectionType} from '../shared/data-types/collection.type';
import {IdentifersPayload} from '../actions/payload-parameters.interface';

export interface State {
  collections: CollectionType[];
  loading: boolean;

}

const initialState: State = {
  collections: [],
  loading: false
};

export function reducer(state = initialState, action: CollectionActions): State {

  switch (action.type) {

    case CollectionActionTypes.LIST_BY_AREA: {
      const id = action.payload;
      if (id === '') {
        return {
          collections: [],
          loading: false,
        };
      }
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_RESET: {
      return initialState;
    }

    case CollectionActionTypes.LIST_BY_SUBJECT_AREA: {
      const payload = <IdentifersPayload>action.payload;
      const subjectId = payload.subjectId;
      const areaId = payload.areaId;
      if (subjectId === '' || areaId === '') {
        return {
          collections: [],
          loading: false,
        };
      }
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_SUBJECT: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_ALL_ACTION: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_AREA: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_SUBJECT: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }


    case CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_CATEGORY_AREA: {
      const payload = <IdentifersPayload>action.payload;
      const categoryId = payload.categoryId;
      const areaId = payload.areaId;
      if (categoryId === '' || areaId === '') {
        return {
          collections: [],
          loading: false,
        };
      }
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_CATEGORY_TYPE: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE: {
      return Object.assign({}, state, {
        collections: [],
        loading: true
      });
    }

    case CollectionActionTypes.COLLECTION_ACTION_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.REQUEST_FAILED: {
      return state;
    }

    default: {
      return state;
    }
  }
}

export const getCollectionList = (state: State) => state.collections;
