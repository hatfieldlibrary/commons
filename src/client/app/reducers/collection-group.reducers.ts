
import {CollectionGroupType} from '../shared/data-types/collection-group-type';
import {CollectionGroupActions, GroupActionTypes} from '../actions/collection-group.actions';

export interface State {
  groups: CollectionGroupType[];
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

    case GroupActionTypes.ALL_GROUP_REQUEST_SUCCESS: {
      const result: CollectionGroupType[] = <CollectionGroupType[]>action.payload;
      return Object.assign({}, state, {
        groups: result,
        loading: false
      });
    }

  }
}

export const getCollectionGroupList = (state: State) => state.groups;
