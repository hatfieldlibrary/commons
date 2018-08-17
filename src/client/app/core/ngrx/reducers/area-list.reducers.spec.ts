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
