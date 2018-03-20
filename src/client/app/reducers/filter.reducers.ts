import {FilterActions, FilterActionTypes} from '../actions/filter.actions';
import {SubjectFilterType} from '../shared/data-types/subject-filter.type';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {AreaFilterType} from '../shared/data-types/area-filter.type';

export interface State {
  filterTerm: '';
  selectedSubject: {
    id: 0,
    name: '',
    url: ''
  };
  selectedTypes: [{
    id: 0,
    name: ''
  }];
  selectedAreas: [{
    id: 0,
    title: '',
    count: 0
  }];
  previousAreas: [{
    id: 0,
    title: '',
    count: 0
  }]
}

const initialState: State = {
  filterTerm: '',
  selectedSubject: {
    id: 0,
    name: '',
    url: ''
  },
  selectedTypes: [{
    id: 0,
    name: ''
  }],
  selectedAreas: [{
    id: 0,
    title: '',
    count: 0
  }],
  previousAreas: [{
    id: 0,
    title: '',
    count: 0
  }]
};

export function reducer(state = initialState, action: FilterActions): State {

  switch (action.type) {

    case FilterActionTypes.SET_SUBJECT_FILTER: {

      const filter: SubjectFilterType = <SubjectFilterType>action.payload;
      return Object.assign({}, state, {
        selectedSubject: filter
      });
    }

    case FilterActionTypes.REMOVE_SUBJECT_FILTER: {

      return Object.assign({}, state, {
        selectedSubject: initialState.selectedSubject
      });
    }

    case FilterActionTypes.SET_SEARCH_FILTER: {

      const filter: string = <string>action.payload;
      return Object.assign({}, state, {
        filterTerm: filter
      });
    }

    case FilterActionTypes.CLEAR_SEARCH_FILTER: {
      return Object.assign({}, state, {
        filterTerm: ''
      });
    }

    case FilterActionTypes.SET_TYPE_FILTER: {
      const filter: TypesFilterType[] = <TypesFilterType[]>action.payload;
      return Object.assign({}, state, {
        selectedTypes: filter
      });
    }

    case FilterActionTypes.SET_DEFAULT_TYPE_FILTER: {
      const filter: TypesFilterType[] = [{id: 0, name: ''}];
      return Object.assign({}, state, {
        selectedTypes: filter
      });
    }

    case FilterActionTypes.SET_AREA_FILTER: {
      const filter: AreaFilterType[] = <AreaFilterType[]>action.payload;
      return Object.assign({}, state, {
        previousAreas: state.selectedAreas,
        selectedAreas: filter
      });
    }

    case FilterActionTypes.SET_DEFAULT_AREA_FILTER: {
      const filter: AreaFilterType[] = [{id: 0, title: '', count: 0}];
      return Object.assign({}, state, {
        selectedAreas: filter
      });
    }

    default:
      return state;
  }

}

export const getSubjectsFilter = (state: State) => state.selectedSubject;

export const getTypesFilter = (state: State) => state.selectedTypes;

export const getAreasFilter = (state: State) => state.selectedAreas;

export const getFilterTerm = (state: State) => state.filterTerm;

export const getAllFilters = (state: State) => state;

