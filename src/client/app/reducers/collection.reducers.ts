/**
 * Created by mspalti on 2/22/17.
 */
import {CollectionActions, CollectionActionTypes, IdentifersPayload} from "../actions/collection.actions";
import {CollectionType} from "../shared/data-types/collection.type";

export interface State {
  collections: CollectionType[];
  loading: boolean;

}



const initialState: State = {
  collections:[],
  loading: false
};

export function reducer(state = initialState, action: CollectionActions) : State {

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

    case CollectionActionTypes.LIST_AREA_SUBJECT: {
      const payload = <IdentifersPayload>action.payload;

      const id = payload.id;
      const areaId = payload.areaId;
      if (id === '' || areaId === '') {
        return {
          collections: [],
          loading: false,
        };
      }

      return Object.assign({}, state, {
        loading: true
      });
    }

    case CollectionActionTypes.LIST_BY_AREA_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;
      // The router initializes a new component.  The parent
      return Object.assign({}, state, {
        collections: result,
        loading: false
      });
    }

    case CollectionActionTypes.LIST_BY_SUBJECT_SUCCESS: {
      const result: CollectionType[] = <CollectionType[]>action.payload;

      // The router initializes a new component.  The parent
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
