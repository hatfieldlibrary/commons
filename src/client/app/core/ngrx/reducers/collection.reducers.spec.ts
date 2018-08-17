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

import {Action} from '@ngrx/store';
import {getCollectionList, reducer, State} from './collection.reducers';
import {
  AllCollectionsAction,
  CollectionsActionSuccess,
  CollectionsAreaAction,
  CollectionActionFailed,
  CollectionReset,
  CollectionsSubjectAction,
  CollectionsAreaSubjectAction,
  CollectionsCategoryAreaAction, CollectionsTypeAreaSubjectAction
} from '../actions/collection.actions';
/**
 * Created by mspalti on 3/24/17.
 */
const collectionListMock = [
  {
    id: 1,
    title: 'test title',
    image: 'image',
    url: 'url',
    searchUrl: '',
    description: '',
    date: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false,
    parent: [],
    types: []
  }
];

const initialStateMock = {
  collections: [],
  loading: false
};

class MockAction implements Action {
  type = '';
  payload: any;

}

describe('Collection Reducer', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new CollectionsAreaAction('1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return the current state if action not found', () => {
    expect(
      reducer(undefined, new MockAction())
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return the collection list for areas.', () => {
    expect(
      reducer(undefined, new CollectionsActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should set loading state to true for collection by subject', () => {
    expect(
      reducer(undefined, new CollectionsSubjectAction('1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should set loading state to true for collection by category/area', () => {
    expect(
      reducer(undefined, new CollectionsCategoryAreaAction('1', '1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should set loading state to true for collection by category/area/type', () => {
    expect(
      reducer(undefined, new CollectionsTypeAreaSubjectAction('1', '1', '1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return the collection list for areas and subject.', () => {
    expect(
      reducer(undefined, new CollectionsActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current state on request failure', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionActionFailed('test'))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current empty state if no areas id is provided to CollectionAction', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsAreaAction(''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return current empty state if no areas id is provided to CollectionsCategoryAreaAction', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsCategoryAreaAction('', ''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return empty state if either areas or subject id is missing in CollectionSubjectAction.', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsAreaSubjectAction('', ''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should set loading state to true for area/subject action.', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsAreaSubjectAction('1', '1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return collection for areas list.', () => {

    const state = reducer(undefined, new CollectionsActionSuccess(collectionListMock));
    const result = getCollectionList(state);
    expect(result).toEqual(collectionListMock);

  });

  it('should return list of all collections by subject (all areas).', () => {
    const collectionState: State = {collections: [], loading: true};
    expect(
      reducer(collectionState, new CollectionsActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })

  });

  it('should set loading state to true for all collections', () => {
    expect(
      reducer(undefined, new AllCollectionsAction())
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return list of all collections .', () => {
    const collectionState: State = {collections: [], loading: true};
    expect(
      reducer(collectionState, new CollectionsActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })

  });

  it('should set loading property to true for load collections by subject request', () => {

    expect(reducer(undefined, new CollectionsSubjectAction('1'))).toEqual(
      {
        collections: [],
        loading: true
      }
    )
  });

  it('should reset collections to initial state', () => {
    expect(
      reducer(undefined, new CollectionReset())
    ).toEqual(initialStateMock)

  });

  it('should return default state', () => {
    expect(
      reducer(undefined, {type: undefined, payload: undefined})
    ).toEqual(initialStateMock)

  });
});
