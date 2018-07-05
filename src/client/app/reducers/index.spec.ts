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
import {AreaListActionSuccess, AreaInformationSuccess} from '../actions/area.actions';
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
    parent: []
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
    areaListState = reducers.areaList(undefined, new AreaListActionSuccess(expectedAreas));
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
