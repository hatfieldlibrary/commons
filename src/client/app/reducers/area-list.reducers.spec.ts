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
  AreaListAction,
  AreaListBySubject,
  AreaListByType,
  AreaListByTypeSubject,
  AreaListSuccess
} from '../actions/area.actions';
import {getAreaList, reducer, State} from './area-list.reducers';
/**
 * Created by mspalti on 4/15/17.
 */

const mockApiResponse = [
  {
    id: 1,
    title: 'test areas one',
    count: 1
  },
  {
    id: 2,
    title: 'test areas two',
    count: 1
  },
];

const areaListTypeMock = [
  {
    id: 1,
    name: 'test areas one'

  }, {
    id: 2,
    name: 'test areas two'
  }
];
const defaultState = [
  {
    id: 0,
    name: ''
  }
];

describe('Area List Reducer', () => {

  it('should return the initial default areas state and loading true.', () => {
      expect(
        reducer(undefined, new AreaListAction('1'))
      ).toEqual(
        {
          areaList: defaultState,
          loading: true
        })
    });

 it('should return areas list', () => {

   const areaState: State = {areaList: areaListTypeMock, loading: true};
   const state = reducer(areaState, new AreaListSuccess(mockApiResponse));
   const result = getAreaList(state);
   expect(result).toEqual(areaListTypeMock);

 });

it('should return default state', () => {
   const state = reducer(undefined, {type: undefined, payload: ''});
   const result = getAreaList(state);
   expect(result).toEqual(defaultState);
 });

it('should return default state and loading true for areas by subject', () => {
  expect(
    reducer(undefined, new AreaListBySubject('1'))
  ).toEqual(
    {
      areaList: defaultState,
      loading: true
    })
});

  it('should return default state and loading true for areas by type', () => {
    expect(
      reducer(undefined, new AreaListByType('1'))
    ).toEqual(
      {
        areaList: defaultState,
        loading: true
      })
  });

  it('should return default state and loading true for areas by type/subject', () => {
    expect(
      reducer(undefined, new AreaListByTypeSubject({typeId: '1', subjectId: '1'}))
    ).toEqual(
      {
        areaList: defaultState,
        loading: true
      })
  });

});
