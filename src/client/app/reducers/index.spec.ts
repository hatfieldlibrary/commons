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

import {reducers} from "./";
import {SubjectActionSuccess} from "../actions/subject-actions";
import {getAreasState, getAreaListState, getCollectionssState, getItemState, getSubjectsState, State} from "./index";
import {ItemSuccess} from "../actions/item.actions";
import {AreaActionSuccess, AreaInformation, AreaInformationSuccess} from "../actions/area.actions";
import {CollectionActionSuccess} from "../actions/collection.actions";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";
import {getAreaList} from "./area-list.reducers";
import {getSubjectList, reducer} from "./subject.reducers";


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

  const expectedCollection = {
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

  const expectedItemTypes = [{
    id: 0,
    name: 'test item type',
    icon: ''
  }];

  const expectedItem = {
    collection: expectedCollection,
    category: expectedCategory,
    itemTypes: expectedItemTypes,
    subjects: [1]
  };

  const expectedCollections = [expectedCollection];

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
    subjectState = reducers.subjects(undefined, new SubjectActionSuccess(expectedSubjects));
    itemState = reducers.item(undefined, new ItemSuccess(expectedItem));
    areaState = reducers.area(undefined, new AreaInformationSuccess(expectedArea));
    areaListState = reducers.areaList(undefined, new AreaActionSuccess(expectedAreas));
    collectionState = reducers.collections(undefined, new CollectionActionSuccess(expectedCollections));

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
    const result = getCollectionssState(collectionState);
    expect(result).toBeDefined();

  });


});
