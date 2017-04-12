import {RelatedType} from "../shared/data-types/related-collection";
import {ItemActions, ItemActionTypes} from "../actions/item.actions";

export interface State {
  related: RelatedType[];
  loading: boolean;

}

const initialState: State = {
  related: [],
  loading: false
};

export function reducer(state = initialState, action: ItemActions): State {
  switch (action.type) {

    case ItemActionTypes.RELATED_COLLECTIONS: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ItemActionTypes.RELATED_COLLECTIONS_SUCCESS: {

      const result: RelatedType[] = <RelatedType[]>action.payload;
      return Object.assign({}, state, {
        related: result,
        loading: false
      });

    }

    case ItemActionTypes.CLEAR_RELATED_COLLECTIONS: {

      return Object.assign({}, state, {
        related: [],
        loading: false
      })
    }

    default:
      return state;

  }

}

export const getRelatedList = (state: State) => state.related;
