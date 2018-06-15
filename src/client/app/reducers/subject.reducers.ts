/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 2/24/17.
 */
import {SubjectActions, SubjectActionTypes} from '../actions/subject-actions';
import {SubjectType} from '../shared/data-types/subject.type';

export interface State {
  subjects: SubjectType[];
  selectedSubject: SubjectType;
  loading: boolean;

}

const initialState: State = {
  subjects: [],
  selectedSubject: {id: 0, name: ''},
  loading: false
};

export function reducer(state = initialState, action: SubjectActions): State {
  switch (action.type) {

    case SubjectActionTypes.SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_SUCCESS: {

      const result: SubjectType[] = <SubjectType[]>action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }
    case SubjectActionTypes.ALL_SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.ALL_SUBJECT_LIST_SUCCESS: {

      const result: SubjectType[] = <SubjectType[]>action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }


    case SubjectActionTypes.SUBJECT_LIST_FOR_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_TYPE_SUCCESS: {

      const result: SubjectType[] = <SubjectType[]>action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE_SUCCESS: {

      const result: SubjectType[] = <SubjectType[]>action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }


    case SubjectActionTypes.CURRENT_SELECTED_SUBJECT: {

      const selectedId: string = <string>action.payload;
      let selected = state.subjects.find((subject) => {
        return subject.id === +selectedId;
      });
      if (!selected) {
        selected = initialState.selectedSubject;
      }
      return Object.assign({}, state, {
        selectedSubject: selected
      });

  }

    case SubjectActionTypes.REMOVE_CURRENT_SELECTED_SUBJECT: {
      return Object.assign({}, state, {
        selectedSubject: {id: 0, name: ''}
      });
    }


    default:
      return state;

  }

}

export const getSubjectList = (state: State) => state.subjects;

export const getSelectedSubject = (state: State) => state.selectedSubject;
