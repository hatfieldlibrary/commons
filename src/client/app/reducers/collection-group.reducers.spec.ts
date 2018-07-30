import {reducer} from './collection-group.reducers';
import {
  AllGroupsAction,
  GroupActionSuccess, GroupsByArea,
  GroupsByAreaSubject,
  GroupsByAreaSubjectType,
  GroupsByAreaType, GroupsBySubject, GroupsBySubjectType, GroupsByType
} from '../actions/collection-group.actions';


const mockGroups = [
  {id: 1, name: 'g1'},
  {id: 2, name: 'g2'}
];

describe('Collection Group Reducer', () => {

  it('should init request for all groups.', () => {
    expect(
      reducer(undefined, new AllGroupsAction())
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });
  it('should return the collection group list.', () => {
    expect(
      reducer(undefined, new GroupActionSuccess(mockGroups))
    ).toEqual(
      {
        groups: mockGroups,
        loading: false
      })
  });

  it('should init request for the collection group list by area, subject, type.', () => {
    expect(
      reducer(undefined, new GroupsByAreaSubjectType('1', '1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area, type.', () => {
    expect(
      reducer(undefined, new GroupsByAreaType('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area, subject.', () => {
    expect(
      reducer(undefined, new GroupsByAreaSubject('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by type, subject.', () => {
    expect(
      reducer(undefined, new GroupsBySubjectType('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by type.', () => {
    expect(
      reducer(undefined, new GroupsByType('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by subject.', () => {
    expect(
      reducer(undefined, new GroupsBySubject('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area.', () => {
    expect(
      reducer(undefined, new GroupsByArea('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });
});
