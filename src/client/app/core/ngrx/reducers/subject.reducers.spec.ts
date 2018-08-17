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

import {
  SubjectActionFailed,
  SubjectActionSuccess, SubjectsForAreaGroup, SubjectsForAreaGroupType, SubjectsForAreaTypes
} from '../actions/subject-actions';
import {getSubjectList, reducer} from './subject.reducers';
import {Action} from '@ngrx/store';

/**
 * Created by mspalti on 3/27/17.
 */

const expectedSubjects = [
  {
    id: 1,
    name: 'test subject'
  }
];

const mockState = {
  subjects: expectedSubjects,
  selectedSubject: undefined,
  removedSubjects: undefined,
  loading: false
};

class MockAction implements Action {
  type = '';
  payload: any;

}

describe('Subject Reducers', () => {

  it('should return subject information', () => {

    const state = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
    const result = getSubjectList(state);
    expect(result).toEqual(expectedSubjects);
  });

  it('should return error message', () => {

    const state = reducer(undefined, new SubjectActionFailed('test'));
    const result = getSubjectList(state);
    expect(result).toEqual([]);
  });

  it('should return loading state for area and group', () => {

    const state = reducer(undefined, new SubjectsForAreaGroup('1', '1'));
    expect(state.loading).toBeTruthy();
    const result = getSubjectList(state);
    expect(result).toEqual([]);
  });

  it('should return loading state for area and type', () => {

    const state = reducer(undefined, new SubjectsForAreaTypes('1', '1'));
    expect(state.loading).toBeTruthy();
    const result = getSubjectList(state);
    expect(result).toEqual([]);
  });

  it('should return loading state for area, group and type', () => {

    const state = reducer(undefined, new SubjectsForAreaGroupType('1', '1', '1'));
    expect(state.loading).toBeTruthy();
    const result = getSubjectList(state);
    expect(result).toEqual([]);
  });
});
