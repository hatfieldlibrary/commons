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

import {reducers} from './';
import {SubjectActionSuccess} from '../actions/subject-actions';
import {
  getAreasState,
  getAreaListState,
  getItemState,
  getSubjectsState,
  getRelatedState,
  getAuthStatusState,
  getCollectionsState
} from './index';
import {ItemSuccess} from '../actions/item.actions';
import {AreaListSuccess, AreaInformationSuccess} from '../actions/area.actions';
import {CollectionsActionSuccess} from '../actions/collection.actions';
import {ItemActionRelatedSuccess} from '../actions/related.actions';
import {SetAuthStatus} from '../actions/auth.action';


describe('Reducers ', () => {

  let subjectState;
  let itemState;
  let areaState;
  let areaListState;
  let collectionState;
  let relatedItemsState;
  let authState;

  const expectedSubjects = [
    {
      id: 1,
      name: 'test subject',
      url: ''
    }
  ];

  const expectedAreas = [
    {
      id: 1,
      title: 'test',
      count: 2
    }, {
      id: 2,
      title: 'test 2',
      count: 1
    }
  ];

  const expectedCollection = {
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
  };

  const expectedCategory = {
    id: 1,
    title: 'test category',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  };

  const expectedRelatedItems = [
    {
      id: 1,
      title: 'related thing',
      image: ''
    },
    {
      id: 2,
      title: 'related thing two',
      image: ''
    }
  ];

  const expectedItemTypes = [{
    id: 0,
    name: 'test item type',
    icon: ''
  }];

  const expectedItem = {
    collection: expectedCollection,
    category: expectedCategory,
    itemTypes: expectedItemTypes,
    subjects: [{id: 1, name: 'test'}]
  };

  const expectedCollections = [expectedCollection];

  const expectedArea = {
    id: 1,
    title: 'Area One',
    linkLabel: '',
    url: '',
    searchUrl: '',
    image: '',
    description: '',
    position: 0
  };

  beforeEach(() => {
    subjectState = reducers.subjects(undefined, new SubjectActionSuccess(expectedSubjects));
    itemState = reducers.item(undefined, new ItemSuccess(expectedItem));
    areaState = reducers.area(undefined, new AreaInformationSuccess(expectedArea));
    areaListState = reducers.areaList(undefined, new AreaListSuccess(expectedAreas));
    collectionState = reducers.collections(undefined, new CollectionsActionSuccess(expectedCollections));
    relatedItemsState = reducers.related(undefined, new ItemActionRelatedSuccess(expectedRelatedItems));
    authState = reducers.auth(undefined, new SetAuthStatus({auth: true}));
  });

  it('should return subject list state', () => {

    const result = getSubjectsState(subjectState);
    expect(result).toBeDefined();

  });

  it('should return item state.', () => {
    const result = getItemState(itemState);
    expect(result).toBeDefined();

  });

  it('should return areaList state.', () => {
    const result = getAreaListState(areaListState);
    expect(result).toBeDefined();
  });

  it('should return collections state.', () => {
    const result = getCollectionsState(collectionState);
    expect(result).toBeDefined();

  });

  it('should return areas state', () => {
    const result = getAreasState(areaState);
    expect(result).toBeDefined();
  });

  it('should return related areas state', () => {
    const result = getRelatedState(relatedItemsState);
    expect(result).toBeDefined();
  });

  it('should return the authentication status', () => {
    const result = getAuthStatusState(authState);
    expect(result).toBeDefined();
  });


});
