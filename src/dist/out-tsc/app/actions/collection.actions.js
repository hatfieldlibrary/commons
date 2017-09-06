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
import { type } from "../shared/ngrx/type";
export var CollectionActionTypes = {
    LIST_ALL_ACTION: type('[Collections] List all Collections'),
    LIST_ALL_SUCCESS_ACTION: type('[Collections] List all Collections Success'),
    LIST_BY_AREA: type('[Collections] Search by AreaType'),
    LIST_BY_AREA_SUCCESS: type('[Collections] AreaType Collections'),
    LIST_BY_AREA_SUBJECT: type('[Collections] Search by SubjectType'),
    LIST_BY_AREA_SUBJECT_SUCCESS: type('[Collections] SubjectType Collections'),
    LIST_ALL_BY_SUBJECT: type('[Collections] All Collections by Subject'),
    LIST_ALL_BY_SUBJECT_SUCCESS: type('[Collections] All Collections by Subject Success'),
    LIST_RESET: type('[Collections] Reset the Collection List to Empty'),
    REQUEST_FAILED: type('[Collections] Search Failed')
};
var CollectionAction = (function () {
    function CollectionAction(payload) {
        this.payload = payload;
        this.type = CollectionActionTypes.LIST_BY_AREA;
    }
    return CollectionAction;
}());
export { CollectionAction };
var CollectionReset = (function () {
    function CollectionReset() {
        this.type = CollectionActionTypes.LIST_RESET;
    }
    return CollectionReset;
}());
export { CollectionReset };
var AllCollectionsAction = (function () {
    function AllCollectionsAction() {
        this.type = CollectionActionTypes.LIST_ALL_ACTION;
    }
    return AllCollectionsAction;
}());
export { AllCollectionsAction };
var AllCollectionsActionSuccess = (function () {
    function AllCollectionsActionSuccess(payload) {
        this.payload = payload;
        this.type = CollectionActionTypes.LIST_ALL_SUCCESS_ACTION;
    }
    return AllCollectionsActionSuccess;
}());
export { AllCollectionsActionSuccess };
var CollectionActionSuccess = (function () {
    function CollectionActionSuccess(searchResult) {
        this.type = CollectionActionTypes.LIST_BY_AREA_SUCCESS;
        this.payload = searchResult;
    }
    return CollectionActionSuccess;
}());
export { CollectionActionSuccess };
var CollectionSubjectAction = (function () {
    function CollectionSubjectAction(id, areaId) {
        this.id = id;
        this.areaId = areaId;
        this.type = CollectionActionTypes.LIST_BY_AREA_SUBJECT;
        this.payload = {
            id: id,
            areaId: areaId
        };
    }
    return CollectionSubjectAction;
}());
export { CollectionSubjectAction };
var CollectionSubjectActionSuccess = (function () {
    function CollectionSubjectActionSuccess(searchResult) {
        this.type = CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS;
        this.payload = searchResult;
    }
    return CollectionSubjectActionSuccess;
}());
export { CollectionSubjectActionSuccess };
var AllCollectionSubjectAction = (function () {
    function AllCollectionSubjectAction(payload) {
        this.payload = payload;
        this.type = CollectionActionTypes.LIST_ALL_BY_SUBJECT;
    }
    return AllCollectionSubjectAction;
}());
export { AllCollectionSubjectAction };
var AllCollectionSubjectActionSuccess = (function () {
    function AllCollectionSubjectActionSuccess(searchResult) {
        this.type = CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS;
        this.payload = searchResult;
    }
    return AllCollectionSubjectActionSuccess;
}());
export { AllCollectionSubjectActionSuccess };
var CollectionActionFailed = (function () {
    function CollectionActionFailed(err) {
        this.type = CollectionActionTypes.REQUEST_FAILED;
        console.log(err);
    }
    return CollectionActionFailed;
}());
export { CollectionActionFailed };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/collection.actions.js.map