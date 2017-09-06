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
export var SubjectActionTypes = {
    SUBJECT_LIST: type('[SubjectType] List Subjects for Area Request'),
    SUBJECT_LIST_SUCCESS: type('[SubjectType] List Subjects for Area Response'),
    ALL_SUBJECT_LIST: type('[SubjectType] List All Subjects Request'),
    ALL_SUBJECT_LIST_SUCCESS: type('[SubjectType] List All Subjects Response'),
    CURRENT_SELECTED_SUBJECT: type('[SubjectType] Currently Selected Subject'),
    REMOVE_CURRENT_SELECTED_SUBJECT: type('[SubjectType] Remove thee currently Selected Subject'),
    REQUEST_FAILED: type('[SubjectType] Search Failed')
};
var SubjectAction = (function () {
    function SubjectAction(payload) {
        this.payload = payload;
        this.type = SubjectActionTypes.SUBJECT_LIST;
    }
    return SubjectAction;
}());
export { SubjectAction };
var SubjectActionSuccess = (function () {
    function SubjectActionSuccess(subjects) {
        this.type = SubjectActionTypes.SUBJECT_LIST_SUCCESS;
        this.payload = subjects;
    }
    return SubjectActionSuccess;
}());
export { SubjectActionSuccess };
var AllSubjectAction = (function () {
    function AllSubjectAction() {
        this.type = SubjectActionTypes.ALL_SUBJECT_LIST;
    }
    return AllSubjectAction;
}());
export { AllSubjectAction };
var AllSubjectActionSuccess = (function () {
    function AllSubjectActionSuccess(payload) {
        this.payload = payload;
        this.type = SubjectActionTypes.ALL_SUBJECT_LIST_SUCCESS;
    }
    return AllSubjectActionSuccess;
}());
export { AllSubjectActionSuccess };
var CurrentSubject = (function () {
    function CurrentSubject(payload) {
        this.payload = payload;
        this.type = SubjectActionTypes.CURRENT_SELECTED_SUBJECT;
    }
    return CurrentSubject;
}());
export { CurrentSubject };
var RemoveCurrentSubject = (function () {
    function RemoveCurrentSubject() {
        this.type = SubjectActionTypes.CURRENT_SELECTED_SUBJECT;
    }
    return RemoveCurrentSubject;
}());
export { RemoveCurrentSubject };
var SubjectActionFailed = (function () {
    function SubjectActionFailed(err) {
        this.type = SubjectActionTypes.REQUEST_FAILED;
        console.log(err);
    }
    return SubjectActionFailed;
}());
export { SubjectActionFailed };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/subject-actions.js.map