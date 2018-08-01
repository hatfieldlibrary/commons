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
      reducer(undefined, new ContentTypesAreaSubjectAction('1', '1'))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by group, subject.', () => {
    expect(
      reducer(undefined, new ContentTypesSubjectGroupAction('1', '1'))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

  it('should init request for types by area, group, subject.', () => {
    expect(
      reducer(undefined, new ContentTypesAreaSubjectGroupAction('1', '1', '1'))
    ).toEqual(
      {
        types: [],
        loading: true
      })
  });

});
