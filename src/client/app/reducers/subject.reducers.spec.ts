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
        loading: true
      }
    )
  });

  it('should return subject list', () => {

    expect(
      reducer(undefined, new SubjectActionSuccess(expectedSubjects))
    ).toEqual({
        subjects: expectedSubjects,
        loading: false
      }
    )
  });


  it('should return subject list', () => {

    expect(
      reducer(undefined, new AllSubjectActionSuccess(expectedSubjects))
    ).toEqual({
        subjects: expectedSubjects,
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
