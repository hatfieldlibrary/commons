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

import {reducer} from "./";
import {SubjectActionSuccess} from "../actions/subject-actions";
import {getAreasState, getAreaListState, getCollectionssState, getItemState, getSubjectsState} from "./index";
import {ItemSuccess} from "../actions/item.actions";
import {AreaActionSuccess, AreaInformation, AreaInformationSuccess} from "../actions/area.actions";
import {CollectionActionSuccess} from "../actions/collection.actions";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";
import {getAreaList} from "./area-list.reducers";

describe('Reducers ', () => {

  let subjectState;
  let itemState;
  let areaState;
  let areaListState;
  let collectionState;
  let areaInfoState;

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

  const expectedItem = {
    collection: {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      searchUrl: '',
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

  const expectedCollections = [
    {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      searchUrl: '',
      desc: '',
      dates: '',
      items: '',
      linkOptions: '',
      searchOptions: '',
      assetType: '',
      restricted: false,
      published: false
    }
  ];

  const expectedArea = [{
    id: 1,
    title: 'Area One',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 0
  }];


  beforeEach(() => {
    subjectState = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
    itemState = reducer(undefined, new ItemSuccess(expectedItem));
    areaState = reducer(undefined, new AreaInformationSuccess(expectedArea));
    areaListState = reducer(undefined, new AreaActionSuccess(expectedAreas)) ;
    collectionState = reducer(undefined, new CollectionActionSuccess(expectedCollections));

  });

  it('should return subject state', () => {

    const result = getSubjectsState(subjectState);
    expect(result).toEqual({
      subjects: expectedSubjects,
      selectedSubject: {id: 0, name: '', url: ''},
      loading: false
    });

  });

  it('should return item state.', () => {
    const result = getItemState(itemState);
    expect(result).toEqual({
      item: expectedItem,
      loading: false
    });

  });

  it('should return areaList state.', () => {
    const result = getAreaListState(areaListState);
    expect(result).toEqual({
      areaList: expectedAreas,
      loading: false
    });

  });

  it('should return collections state.', () => {
    const result = getCollectionssState(collectionState);
    expect(result).toEqual({
      collections: expectedCollections,
      loading: false
    });

  });


});
