
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

import {getAreaInfo, reducer, State} from './area.reducers';
import {
  AreaListAction, AreaListActionFailed, AreaListActionSuccess, AreaDefaultList, AreaInformation, AreaInformationSuccess
} from '../actions/area.actions';
import {Action} from '@ngrx/store';
import {AreaType} from '../shared/data-types/area.type';
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

const areaMock = [{
  id: 1,
  title:  'Archival Collections',
  linkLabel:  'Area Button Label',
  url:  'Area URL',
  searchUrl:  'Area Search URL',
  description:  'Description Two.',
  position: 2

}];

const initialState = [{
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 0
}];

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
        areas: initialState,
        loading: true
      });
  });

  it('should return the current state', () => {
    const areaState: State = {areas: areaMock, loading: false};

    expect(
      reducer(areaState, new MockAction())
    ).toEqual(
      {
        areas: areaMock,
        loading: false
      });
  });

  it('should return state with updated areas information', () => {

    const areaState: State = {areas: areaMock, loading: true};
    expect(
      reducer(areaState, new AreaInformationSuccess(areaMock))
    ).toEqual(
      {
        areas: areaMock,
        loading: false
      });
  });


  it('should return current state and fail.', () => {
    const areaState: State = {areas: areaMock, loading: false};
    expect(
      reducer(areaState, new AreaListActionFailed('error'))
    ).toEqual(
      {
        areas: areaMock,
        loading: false
      });

  });

  it('should return default state', () => {
    let state = reducer(undefined, {type: undefined, payload: ''});
    let result = getAreaInfo(state);
    expect(result).toEqual(initialState);
  });

  it('should return default state after reset request', () => {
    let state = reducer(undefined, new AreaDefaultList());
    let result = getAreaInfo(state);
    expect(result).toEqual(initialState);
  });




});
