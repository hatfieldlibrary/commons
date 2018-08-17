/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {FilterActions, FilterActionTypes} from '../actions/filter.actions';
import {FieldFilterType} from '../../data-types/field-filter.type';

export interface State {
  filterTerm: '';
  selectedSubjects: [{
    id: number,
    name: string
  }];
  selectedTypes: [{
    id: number,
    name: string
  }];
  selectedAreas: [{
    id: number,
    name: string
  }];
  selectedGroups: [{
    id: number,
    name: string
  }];
  removedAreas: [{
    id: number,
    name: string
  }];
  removedSubjects: [{
    id: number,
    name: string
  }];
  removedTypes: [{
    id: number,
    name: string
  }];
  removedGroups: [{
    id: number,
    name: string
  }];
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
    name: ''
  }],
  selectedGroups: [{
    id: 0,
    name: ''
  }],
  removedAreas: [{
    id: 0,
    name: ''
  }],
  removedSubjects: [{
    id: 0,
    name: ''
  }],
  removedTypes: [{
    id: 0,
    name: ''
  }],
  removedGroups: [{
    id: 0,
    name: ''
  }]
};

export function reducer(state = initialState, action: FilterActions): State {

  switch (action.type) {

    case FilterActionTypes.REMOVE_SELECTED_SUBJECT: {
      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        removedSubjects: result
      });
    }

    case FilterActionTypes.REMOVE_SELECTED_TYPE: {
      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        removedTypes: result
      });
    }

    case FilterActionTypes.REMOVE_SELECTED_GROUP: {
      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        removedGroups: result
      });
    }

    case FilterActionTypes.SET_SUBJECT_FILTER: {

      const filter: FieldFilterType[] = <FieldFilterType[]>action.payload;
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
      const filter: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        selectedTypes: filter
      });
    }

    case FilterActionTypes.SET_DEFAULT_TYPE_FILTER: {
      const filter: FieldFilterType[] = [{id: 0, name: ''}];
      return Object.assign({}, state, {
        selectedTypes: filter
      });
    }

    case FilterActionTypes.SET_AREA_FILTER: {
      const filter: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        selectedAreas: filter
      });
    }

    case FilterActionTypes.SET_DEFAULT_AREA_FILTER: {
      const filter: FieldFilterType[] = [{id: 0, name: ''}];
      return Object.assign({}, state, {
        selectedAreas: filter
      });
    }

    case FilterActionTypes.SET_GROUP_FILTER: {
      const filter: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        selectedGroups: filter
      });
    }

    default:
      return state;
  }

}

export const getSubjectsFilter = (state: State) => state.selectedSubjects;

export const getRemovedSubjectsFilter = (state: State) => state.removedSubjects;

export const getRemovedTypesFilter = (state: State) => state.removedTypes;

export const getRemovedGroupsFilter = (state: State) => state.removedGroups;

export const getTypesFilter = (state: State) => state.selectedTypes;

export const getAreasFilter = (state: State) => state.selectedAreas;

export const getCollectionGroupFilter = (state: State) => state.selectedGroups;

export const getFilterTerm = (state: State) => state.filterTerm;

export const getAllFilters = (state: State) => state;

