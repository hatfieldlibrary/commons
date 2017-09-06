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
/**
 * Created by mspalti on 2/24/17.
 */
import { SubjectActionTypes } from "../actions/subject-actions";
var initialState = {
    subjects: [],
    selectedSubject: { id: 0, name: '', url: '' },
    loading: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SubjectActionTypes.SUBJECT_LIST: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case SubjectActionTypes.SUBJECT_LIST_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                subjects: result,
                loading: false
            });
        }
        case SubjectActionTypes.ALL_SUBJECT_LIST: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case SubjectActionTypes.ALL_SUBJECT_LIST_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                subjects: result,
                loading: false
            });
        }
        case SubjectActionTypes.CURRENT_SELECTED_SUBJECT: {
            var selectedId_1 = action.payload;
            var selected = state.subjects.find(function (subject) {
                return subject.id === selectedId_1;
            });
            return Object.assign({}, state, {
                selectedSubject: selected
            });
        }
        case SubjectActionTypes.REMOVE_CURRENT_SELECTED_SUBJECT: {
            return Object.assign({}, state, {
                selectedSubject: {}
            });
        }
        default:
            return state;
    }
}
export var getSubjectList = function (state) { return state.subjects; };
export var getSelectedSubject = function (state) { return state.selectedSubject; };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/subject.reducers.js.map