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

import {getItem, reducer, State} from "./item.reducers";
import {ItemRequest, ItemRequestFailed, ItemSuccess} from "../actions/item.actions";
import {Action} from "@ngrx/store";

/**
 * Created by mspalti on 3/24/17.
 */

const initializeItem = {
  collection: {
    id: 0,
    title: '',
    image: '',
    url: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
  },
  category: {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  },
  itemTypes: [{
      id: 0,
      name: '',
      icon: ''
    }],
  subjects: []
};

const itemMock = {
  collection: {
    id: 0,
    title: '',
    image: '',
    url: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
  },
  category: {
    id: 1,
    title: 'test category',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  },
  itemTypes: [{
    id: 0,
    name: 'test item type',
    icon: ''
  }],
  subjects: [1]
};


class MockAction implements Action {
  type: string = '';
  payload: any;

}


describe('Item Reducers', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new ItemRequest('1'))
    ).toEqual({
        item: initializeItem,
        loading: true
      }
    )
  });

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new ItemSuccess(itemMock))
    ).toEqual({
        item: itemMock,
        loading: false
      }
    )
  });

  it('should return the current state if action not found', () => {
    expect(
      reducer(undefined, new MockAction())
    ).toEqual(
      {
        item: initializeItem,
        loading: false
      })
  });

  it('should return current state and fail.', () => {
      let itemState: State = {item: itemMock, loading: false};
      expect(
        reducer(itemState, new ItemRequestFailed('error'))
      ).toEqual(
        {
          item: itemMock,
          loading: false
        });

  });

  it('should return item  information', () => {

    let state = reducer(undefined, new ItemSuccess(itemMock));
    let result = getItem(state);
    expect(result).toEqual(itemMock);
  });

});
