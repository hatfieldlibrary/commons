
import {ContentTypeListType} from '../shared/data-types/content-types.type';
import {ContentTypeActions, ContentTypeActionTypes} from '../actions/type.actions';

export interface State {
  types: ContentTypeListType[];
  loading: boolean;

}

const initialState: State = {
  types: [<ContentTypeListType>{
    id: 0,
    name: ''
  }],
  loading: false
};

export function reducer(state = initialState, action: ContentTypeActions): State {

  switch (action.type) {

    case ContentTypeActionTypes.TYPE_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ContentTypeActionTypes.TYPE_LIST_SUCCESS: {

      const result: ContentTypeListType[] = <ContentTypeListType[]>action.payload;
      return Object.assign({}, state, {
        types: result,
        loading: false
      });

    }

    case ContentTypeActionTypes.TYPE_AREA_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ContentTypeActionTypes.TYPE_AREA_LIST_SUCCESS: {

      const result: ContentTypeListType[] = <ContentTypeListType[]>action.payload;
      return Object.assign({}, state, {
        types: result,
        loading: false
      });

    }

    case ContentTypeActionTypes.TYPE_SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ContentTypeActionTypes.TYPE_SUBJECT_LIST_SUCCESS: {

      const result: ContentTypeListType[] = <ContentTypeListType[]>action.payload;
      return Object.assign({}, state, {
        types: result,
        loading: false
      });

    }

    case ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST_SUCCESS: {

      const result: ContentTypeListType[] = <ContentTypeListType[]>action.payload;
      return Object.assign({}, state, {
        types: result,
        loading: false
      });

    }

    case ContentTypeActionTypes.REQUEST_FAILED: {
      return state;

    }

    default:
      return state;

  }

}

export const getTypesList = (state: State) => state.types;


