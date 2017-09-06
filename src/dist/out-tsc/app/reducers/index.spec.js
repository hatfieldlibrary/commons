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
import { reducers } from "./";
import { SubjectActionSuccess } from "../actions/subject-actions";
import { getAreaListState, getCollectionssState, getItemState, getSubjectsState } from "./index";
import { ItemSuccess } from "../actions/item.actions";
import { AreaActionSuccess, AreaInformationSuccess } from "../actions/area.actions";
import { CollectionActionSuccess } from "../actions/collection.actions";
describe('Reducers ', function () {
    var subjectState;
    var itemState;
    var areaState;
    var areaListState;
    var collectionState;
    var areaInfoState;
    var expectedSubjects = [
        {
            id: 1,
            name: 'test subject',
            url: ''
        }
    ];
    var expectedAreas = [
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
    var expectedCollection = {
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
    var expectedCategory = {
        id: 1,
        title: 'test category',
        linkLabel: '',
        url: '',
        secondaryUrl: '',
        description: '',
        areaId: ''
    };
    var expectedItemTypes = [{
            id: 0,
            name: 'test item type',
            icon: ''
        }];
    var expectedItem = {
        collection: expectedCollection,
        category: expectedCategory,
        itemTypes: expectedItemTypes,
        subjects: [1]
    };
    var expectedCollections = [expectedCollection];
    var expectedArea = [{
            id: 1,
            title: 'Area One',
            linkLabel: '',
            url: '',
            searchUrl: '',
            description: '',
            position: 0
        }];
    beforeEach(function () {
        subjectState = reducers.subjects(undefined, new SubjectActionSuccess(expectedSubjects));
        itemState = reducers.item(undefined, new ItemSuccess(expectedItem));
        areaState = reducers.area(undefined, new AreaInformationSuccess(expectedArea));
        areaListState = reducers.areaList(undefined, new AreaActionSuccess(expectedAreas));
        collectionState = reducers.collections(undefined, new CollectionActionSuccess(expectedCollections));
    });
    it('should return subject list state', function () {
        var result = getSubjectsState(subjectState);
        expect(result).toBeDefined();
    });
    it('should return item state.', function () {
        var result = getItemState(itemState);
        expect(result).toBeDefined();
    });
    it('should return areaList state.', function () {
        var result = getAreaListState(areaListState);
        expect(result).toBeDefined();
    });
    it('should return collections state.', function () {
        var result = getCollectionssState(collectionState);
        expect(result).toBeDefined();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/index.spec.js.map