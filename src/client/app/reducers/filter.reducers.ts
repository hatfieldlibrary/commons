import {FilterActions, FilterActionTypes} from '../actions/filter.actions';
import {SubjectType} from '../shared/data-types/subject.type';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import {CollectionGroupFilter} from '../shared/data-types/collection-group-filter.type';
import {CollectionGroupType} from '../shared/data-types/collection-group-type';

export interface State {
  filterTerm: '';
  selectedSubjects: [{
    id: 0,
    name: ''
  }];
  selectedTypes: [{
    id: 0,
    name: ''
  }];
  selectedAreas: [{
    id: 0,
    title: '',
    count: 0
  }];
  selectedGroups: [{
    id: 0,
    name: ''
  }];
  previousAreas: [{
    id: 0,
    title: '',
    count: 0
  }]
}

const initialState: State = {
  filterTerm: '',
  selectedSubjects: [{
    id: 0,
    name: ''
  }],
  selectedTypes: [{
    id: 0,
    name: ''
  }],
  selectedAreas: [{
    id: 0,
    title: '',
    count: 0
  }],
  selectedGroups: [{
    id: 0,
    name: ''
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

      const filter: SubjectType[] = <SubjectType[]>action.payload;
      return Object.assign({}, state, {
        selectedSubjects: filter
      });
    }

    case FilterActionTypes.REMOVE_SUBJECT_FILTER: {

      return Object.assign({}, state, {
        selectedSubjects: initialState.selectedSubjects
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

    case FilterActionTypes.SET_GROUP_FILTER: {
      const filter: CollectionGroupType[] = <CollectionGroupType[]>action.payload;
      return Object.assign({}, state, {
        selectedGroups: filter
      });
    }

    default:
      return state;
  }

}

export const getSubjectsFilter = (state: State) => state.selectedSubjects;

export const getTypesFilter = (state: State) => state.selectedTypes;

export const getAreasFilter = (state: State) => state.selectedAreas;

export const getCollectionGroupFilter = (state: State) => state.selectedGroups;

export const getFilterTerm = (state: State) => state.filterTerm;

export const getAllFilters = (state: State) => state;

