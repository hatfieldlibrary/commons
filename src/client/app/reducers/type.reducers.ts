
import {ContentTypeListType} from '../shared/data-types/content-types.type';
import {ContentTypeActions, ContentTypeActionTypes} from '../actions/type.actions';

export interface State {
  types: ContentTypeListType[];
  selected: string;
  loading: boolean;

}

const initialState: State = {
  types: [<ContentTypeListType>{
    id: 0,
    name: ''
  }],
  selected: '',
  loading: false
};

export function reducer(state = initialState, action: ContentTypeActions): State {

  switch (action.type) {

    case ContentTypeActionTypes.CURRENT_SELECTED_TYPE: {
      const selected = <string>action.payload;
      return Object.assign({}, state, {
        selected: selected
      });
    }

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

export const getSelectedTypes = (state: State) => state.selected;


