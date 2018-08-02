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
