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
  AllSubjectAction,
   CurrentSubject, RemoveCurrentSubject, SubjectAction, SubjectActionFailed, SubjectActions,
  SubjectActionSuccess
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

  // it('should return the initial state and loading boolean set to true for subject action', () => {
  //   expect(
  //     reducer(undefined, new SubjectAction('1'))
  //   ).toEqual({
  //       subjects: [],
  //       selectedSubject: {id: 0, name: ''},
  //     removedSubjects: {id: 0, name: ''},
  //       loading: true
  //     }
  //   )
  // });
  //
  // it('should return subject list', () => {
  //
  //   expect(
  //     reducer(undefined, new SubjectActionSuccess(expectedSubjects))
  //   ).toEqual({
  //       subjects: expectedSubjects,
  //       selectedSubject: {id: 0, name: ''},
  //       loading: false
  //     }
  //   )
  // });
  //
  // it('should return the initial state and loading boolean set to true all subject action', () => {
  //   expect(
  //     reducer(undefined, new AllSubjectAction())
  //   ).toEqual({
  //       subjects: [],
  //       selectedSubject: {id: 0, name: '', url: ''},
  //       loading: true
  //     }
  //   )
  // });
  //
  // it('should return subject list', () => {
  //
  //   expect(
  //     reducer(undefined, new SubjectActionSuccess(expectedSubjects))
  //   ).toEqual({
  //       subjects: expectedSubjects,
  //       selectedSubject: {id: 0, name: ''},
  //       loading: false
  //     }
  //   )
  // });
  //
  // it('should return the current state if action not found', () => {
  //   expect(
  //     reducer(undefined, new MockAction())
  //   ).toEqual(
  //     {
  //       subjects: [],
  //       selectedSubject: {id: 0, name: ''},
  //       loading: false
  //     })
  // });

  it('should return subject information', () => {

    const state = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
    const result = getSubjectList(state);
    expect(result).toEqual(expectedSubjects);
  });

  it('should return error message', () => {

    const state = reducer(undefined, new SubjectActionFailed('I am a failure.'));
    const result = getSubjectList(state);
    expect(result).toEqual([]);
  });

  // it('should find the current subject', () => {
  //   const state = reducer(mockState, new CurrentSubject('1'));
  //   const result = getSelectedSubject(state);
  //   expect(result).toEqual({id: 1, name: 'test subject'});
  // });
  //
  // it('should return the default selected subject with id zero', () => {
  //   const state = reducer(mockState, new CurrentSubject('-1'));
  //   const result = getSelectedSubject(state);
  //   expect(result).toEqual({id: 0, name: ''});
  // });

  // it('should remove the selected subject', () => {
  //   expect(
  //     reducer(mockState, new RemoveCurrentSubject()))
  //     .toEqual({
  //       subjects: expectedSubjects,
  //       selectedSubject: {id: 0, name: ''},
  //       loading: false
  //     });
  // });

});
