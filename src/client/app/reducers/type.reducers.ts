
import {ContentTypeActions, ContentTypeActionTypes} from '../actions/type.actions';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

export interface State {
  types: FieldFilterType[];
  loading: boolean;

}

const initialState: State = {
  types: [<FieldFilterType>{
    id: 0,
    name: ''
  }],
  loading: false
};

export function reducer(state = initialState, action: ContentTypeActions): State {

  switch (action.type) {

    // case ContentTypeActionTypes.CURRENT_SELECTED_TYPE: {
    //   const selected = <string>action.payload;
    //   return Object.assign({}, state, {
    //     selected: selected
    //   });
    // }

    case ContentTypeActionTypes.TYPE_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    // case ContentTypeActionTypes.TYPE_LIST_SUCCESS: {
    //
    //   const result: TypesFilterType[] = <TypesFilterType[]>action.payload;
    //   return Object.assign({}, state, {
    //     types: result,
    //     loading: false
    //   });
    //
    // }

    case ContentTypeActionTypes.TYPE_AREA_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }
    //
    // case ContentTypeActionTypes.TYPE_AREA_LIST_SUCCESS: {
    //
    //   const result: TypesFilterType[] = <TypesFilterType[]>action.payload;
    //   return Object.assign({}, state, {
    //     types: result,
    //     loading: false
    //   });
    //
    // }

    case ContentTypeActionTypes.TYPE_SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }
    //
    // case ContentTypeActionTypes.TYPE_SUBJECT_LIST_SUCCESS: {
    //
    //   const result: TypesFilterType[] = <TypesFilterType[]>action.payload;
    //   return Object.assign({}, state, {
    //     types: result,
    //     loading: false
    //   });
    //
    // }

    case ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    // case ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST_SUCCESS: {
    //
    //   const result: TypesFilterType[] = <TypesFilterType[]>action.payload;
    //   return Object.assign({}, state, {
    //     types: result,
    //     loading: false
    //   });
    //
    // }


    case ContentTypeActionTypes.TYPES_REQUEST_SUCCESS: {
      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
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

// export const getSelectedTypes = (state: State) => state.selected;


