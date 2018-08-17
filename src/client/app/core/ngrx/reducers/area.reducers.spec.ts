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

import {getAreaInfo, reducer, State} from './area.reducers';
import {
  AreaListActionFailed,  AreaDefaultList, AreaInformation, AreaInformationSuccess
} from '../actions/area.actions';
import {Action} from '@ngrx/store';


/**
 * Created by mspalti on 3/24/17.
 */

const areaListTypeMock = [
  {
    id: 1,
    title: 'test areas one',
    count: 2

  }, {
    id: 2,
    title: 'test areas tw0',
    count: 1
  }
];

const areaMock = {
  id: 1,
  title: 'Archival Collections',
  linkLabel: 'Area Button Label',
  url: 'Area URL',
  searchUrl: 'Area Search URL',
  image: '',
  description: 'Description Two.',
  position: 2

};

const initialState = {
  id: 0,
  title: '',
  linkLabel: '',
  url: '',
  searchUrl: '',
  image: '',
  description: '',
  position: 0
};

class MockAction implements Action {
  type: string;
  payload: any;

}

describe('Area Reducer', () => {


  it('should return state with areas information', () => {
    expect(
      reducer(undefined, new AreaInformation('1'))
    ).toEqual(
      {
        area: initialState,
        loading: true
      });
  });

  it('should return the current state', () => {
    const areaState: State = {area: areaMock, loading: false};

    expect(
      reducer(areaState, new MockAction())
    ).toEqual(
      {
        area: areaMock,
        loading: false
      });
  });

  it('should return state with updated areas information', () => {

    const areaState: State = {area: areaMock, loading: true};
    expect(
      reducer(areaState, new AreaInformationSuccess(areaMock))
    ).toEqual(
      {
        area: areaMock,
        loading: false
      });
  });


  it('should return current state and fail.', () => {
    const areaState: State = {area: areaMock, loading: false};
    expect(
      reducer(areaState, new AreaListActionFailed('test'))
    ).toEqual(
      {
        area: areaMock,
        loading: false
      });

  });

  it('should return default state', () => {
    const state = reducer(undefined, {type: undefined, payload: ''});
    const result = getAreaInfo(state);
    expect(result).toEqual(initialState);
  });

  it('should return default state after reset request', () => {
    const state = reducer(undefined, new AreaDefaultList());
    const result = getAreaInfo(state);
    expect(result).toEqual(initialState);
  });


});
