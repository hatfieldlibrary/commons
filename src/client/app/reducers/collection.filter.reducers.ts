/**
 * Created by mspalti on 5/2/17.
 */
import {CollectionActions, CollectionActionTypes} from '../actions/collection.actions';

export interface State {

    term: string
}

const initialState: State = {
    term: ''
};


export function reducer(state = initialState, action: CollectionActions): State {
  switch (action.type) {

    case CollectionActionTypes.SET_FILTER: {
      return Object.assign({}, state, {
        term: action.payload
      });
    }

    default: return state;
  }

}

export const getCollectionFilter = (state: State) => state.term;
