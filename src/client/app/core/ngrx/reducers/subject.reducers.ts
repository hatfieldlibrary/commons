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

/**
 * Created by mspalti on 2/24/17.
 */
import {SubjectActions, SubjectActionTypes} from '../actions/subject-actions';
import {FieldFilterType} from '../../data-types/field-filter.type';

export interface State {
  subjects: FieldFilterType[];
  loading: boolean;

}

const initialState: State = {
  subjects: [],
  loading: false
};

export function reducer(state = initialState, action: SubjectActions): State {
  switch (action.type) {

    case SubjectActionTypes.SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_REQUEST_SUCCESS: {

      const result: FieldFilterType[] = <FieldFilterType[]>action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case SubjectActionTypes.ALL_SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    default:
      return state;

  }

}

export const getSubjectList = (state: State) => state.subjects;

