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

import {getItem, reducer, State} from './item.reducers';
import {ItemRequest, ItemRequestFailed, ItemSuccess, ItemReset} from '../actions/item.actions';
import {Action} from '@ngrx/store';

/**
 * Created by mspalti on 3/24/17.
 */

const initializeItem = {
  collection: {
    id: 0,
    title: '',
    image: '',
    url: '',
    searchUrl: '',
    description: '',
    date: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false,
    parent: []
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
    searchUrl: '',
    description: '',
    date: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false,
    parent: []
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
  subjects: [{id: 1, name: 'test'}]
};


class MockAction implements Action {
  type = '';
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
      const itemState: State = {item: itemMock, loading: false};
      expect(
        reducer(itemState, new ItemRequestFailed('test'))
      ).toEqual(
        {
          item: itemMock,
          loading: false
        });

  });

  it('should return item  information', () => {
    const state = reducer(undefined, new ItemSuccess(itemMock));
    const result = getItem(state);
    expect(result).toEqual(itemMock);
  });

  it('should reset item information to initial state', () => {
    expect(
      reducer(undefined, new ItemReset())
    ).toEqual(
      {
        item: initializeItem,
        loading: false
      })

  });

});
