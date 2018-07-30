import {reducer} from './type.reducers';
import {
  ContentTypesAllAction,
  ContentTypesAreaAction,
  ContentTypesAreaSubjectAction, ContentTypesAreaSubjectGroupAction,
  ContentTypesSubjectAction, ContentTypesSubjectGroupAction
} from '../actions/type.actions';

describe('Types  Reducer', () => {

  it('should init request for all types.', () => {
    expect(
      reducer(undefined, new ContentTypesAllAction())
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by area.', () => {
    expect(
      reducer(undefined, new ContentTypesAreaAction('1'))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by subject.', () => {
    expect(
      reducer(undefined, new ContentTypesSubjectAction('1'))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by area, subject.', () => {
    expect(
      reducer(undefined, new ContentTypesAreaSubjectAction(
        {
          areaId: '1',
          subjectId: '1',
          groupId: ''
        }))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by group, subject.', () => {
    expect(
      reducer(undefined, new ContentTypesSubjectGroupAction(
        {
          areaId: '',
          subjectId: '1',
          groupId: '1'
        }))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by area, group, subject.', () => {
    expect(
      reducer(undefined, new ContentTypesAreaSubjectGroupAction(
        {
          areaId: '1',
          subjectId: '1',
          groupId: '1'
        }))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

});
