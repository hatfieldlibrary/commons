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
  AllSubjectActionSuccess, SubjectAction, SubjectActionFailed, SubjectActions,
  SubjectActionSuccess
} from "../actions/subject-actions";
import {getSubjectList, reducer} from "./subject.reducers";
import {Action} from "@ngrx/store";
/**
 * Created by mspalti on 3/27/17.
 */

const expectedSubjects = [
  {
    id: 1,
    name: 'test subject',
    url: ''
  }
];

class MockAction implements Action {
  type: string = '';
  payload: any;

}

describe('Subject Reducers', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new SubjectAction('1'))
    ).toEqual({
        subjects: [],
        selectedSubject: {id: 0, name: '', url: ''},
        loading: true
      }
    )
  });

  it('should return subject list', () => {

    expect(
      reducer(undefined, new SubjectActionSuccess(expectedSubjects))
    ).toEqual({
        subjects: expectedSubjects,
        selectedSubject: {id: 0, name: '', url: ''},
        loading: false
      }
    )
  });


  it('should return subject list', () => {

    expect(
      reducer(undefined, new AllSubjectActionSuccess(expectedSubjects))
    ).toEqual({
        subjects: expectedSubjects,
        selectedSubject: {id: 0, name: '', url: ''},
        loading: false
      }
    )
  });

  it('should return the current state if action not found', () => {
    expect(
      reducer(undefined, new MockAction())
    ).toEqual(
      {
        subjects: [],
        selectedSubject: {id: 0, name: '', url: ''},
        loading: false
      })
  });

  it('should return subject information', () => {

    let state = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
    let result = getSubjectList(state);
    expect(result).toEqual(expectedSubjects);
  });

  it('should return error message', () => {

    let state = reducer(undefined, new SubjectActionFailed('I am a failure.'));
    let result = getSubjectList(state);
    expect(result).toEqual([]);
  });

});
