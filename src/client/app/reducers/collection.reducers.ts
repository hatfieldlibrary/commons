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
 * Created by mspalti on 2/22/17.
 */
import {CollectionActions, CollectionActionTypes, IdentifersPayload} from '../actions/collection.actions';
import {CollectionType} from '../shared/data-types/collection.type';

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

    case CollectionActionTypes.LIST_BY_AREA_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_AREA_SUBJECT: {
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
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_ALL_BY_SUBJECT: {
      return Object.assign({}, state, {
        loading: true
      });
    }


    case CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_ALL_ACTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_ALL_SUCCESS_ACTION: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_AREA: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_AREA_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_SUBJECT: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_SUBJECT_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT_SUCCESS: {
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
