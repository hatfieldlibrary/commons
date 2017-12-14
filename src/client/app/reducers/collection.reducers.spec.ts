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

import {Action} from '@ngrx/store';
import {getCollectionList, reducer, State} from './collection.reducers';
import {
  AllCollectionsAction,
  AllCollectionsActionSuccess,
  CollectionsAreaAction, CollectionActionFailed, CollectionsAreaActionSuccess, CollectionReset, CollectionsSubjectAction,
  CollectionsSubjectActionSuccess
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
    published: false
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

  it('should return the collection list for area.', () => {
    expect(
      reducer(undefined, new CollectionsAreaActionSuccess(collectionListMock))
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

  it('should return the collection list for area and subject.', () => {
    expect(
      reducer(undefined, new CollectionsSubjectActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current state on request failure', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionActionFailed('error'))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current empty state if no area id is provided to CollectionAction', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsAreaAction(''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return empty state if either area or subject id is missing in CollectionSubjectAction.', () => {
    const collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionsSubjectAction(''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return collection for area list.', () => {

    const state = reducer(undefined, new CollectionsAreaActionSuccess(collectionListMock));
    const result = getCollectionList(state);
    expect(result).toEqual(collectionListMock);

  });

  it('should return list of all collections by subject (all areas).', () => {
    const collectionState: State = {collections: [], loading: true};
    expect(
      reducer(collectionState, new CollectionsSubjectActionSuccess(collectionListMock))
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
      reducer(collectionState, new AllCollectionsActionSuccess(collectionListMock))
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
