
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

    case GroupActionTypes.GROUPS_ACTION_SUCCESS: {
      const result: CollectionGroupType[] = <CollectionGroupType[]>action.payload;
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
