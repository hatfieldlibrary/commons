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
import { getCollectionList, reducer } from "./collection.reducers";
import { AllCollectionsActionSuccess, AllCollectionSubjectActionSuccess, CollectionAction, CollectionActionFailed, CollectionActionSuccess, CollectionSubjectAction, CollectionSubjectActionSuccess } from "../actions/collection.actions";
/**
 * Created by mspalti on 3/24/17.
 */
var collectionListMock = [
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
var MockAction = (function () {
    function MockAction() {
        this.type = '';
    }
    return MockAction;
}());
describe('Collection Reducer', function () {
    it('should return the initial state and loading true.', function () {
        expect(reducer(undefined, new CollectionAction('1'))).toEqual({
            collections: [],
            loading: true
        });
    });
    it('should return the current state if action not found', function () {
        expect(reducer(undefined, new MockAction())).toEqual({
            collections: [],
            loading: false
        });
    });
    it('should return the collection list for area.', function () {
        expect(reducer(undefined, new CollectionActionSuccess(collectionListMock))).toEqual({
            collections: collectionListMock,
            loading: false
        });
    });
    it('should request collection list for area and subject.', function () {
        expect(reducer(undefined, new CollectionSubjectAction('1', '1'))).toEqual({
            collections: [],
            loading: true
        });
    });
    it('should return the collection list for area and subject.', function () {
        expect(reducer(undefined, new CollectionSubjectActionSuccess(collectionListMock))).toEqual({
            collections: collectionListMock,
            loading: false
        });
    });
    it('should return current state on request failure', function () {
        var collectionState = { collections: collectionListMock, loading: false };
        expect(reducer(collectionState, new CollectionActionFailed('error'))).toEqual({
            collections: collectionListMock,
            loading: false
        });
    });
    it('should return current empty state if no area id is provided to CollectionAction', function () {
        var collectionState = { collections: collectionListMock, loading: false };
        expect(reducer(collectionState, new CollectionAction(''))).toEqual({
            collections: [],
            loading: false
        });
    });
    it('should return empty state if either area or subject id is missing in CollectionSubjectAction.', function () {
        var collectionState = { collections: collectionListMock, loading: false };
        expect(reducer(collectionState, new CollectionSubjectAction('', '1'))).toEqual({
            collections: [],
            loading: false
        });
    });
    it('should return collection for area list.', function () {
        var state = reducer(undefined, new CollectionActionSuccess(collectionListMock));
        var result = getCollectionList(state);
        expect(result).toEqual(collectionListMock);
    });
    it('should return list of all collections by subject (all areas).', function () {
        var collectionState = { collections: [], loading: true };
        expect(reducer(collectionState, new AllCollectionSubjectActionSuccess(collectionListMock))).toEqual({
            collections: collectionListMock,
            loading: false
        });
    });
    it('should return list of all collections .', function () {
        var collectionState = { collections: [], loading: true };
        expect(reducer(collectionState, new AllCollectionsActionSuccess(collectionListMock))).toEqual({
            collections: collectionListMock,
            loading: false
        });
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/collection.reducers.spec.js.map