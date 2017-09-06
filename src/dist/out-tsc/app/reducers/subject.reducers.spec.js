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
import { AllSubjectActionSuccess, SubjectAction, SubjectActionFailed, SubjectActionSuccess } from "../actions/subject-actions";
import { getSubjectList, reducer } from "./subject.reducers";
/**
 * Created by mspalti on 3/27/17.
 */
var expectedSubjects = [
    {
        id: 1,
        name: 'test subject',
        url: ''
    }
];
var MockAction = (function () {
    function MockAction() {
        this.type = '';
    }
    return MockAction;
}());
describe('Subject Reducers', function () {
    it('should return the initial state and loading true.', function () {
        expect(reducer(undefined, new SubjectAction('1'))).toEqual({
            subjects: [],
            selectedSubject: { id: 0, name: '', url: '' },
            loading: true
        });
    });
    it('should return subject list', function () {
        expect(reducer(undefined, new SubjectActionSuccess(expectedSubjects))).toEqual({
            subjects: expectedSubjects,
            selectedSubject: { id: 0, name: '', url: '' },
            loading: false
        });
    });
    it('should return subject list', function () {
        expect(reducer(undefined, new AllSubjectActionSuccess(expectedSubjects))).toEqual({
            subjects: expectedSubjects,
            selectedSubject: { id: 0, name: '', url: '' },
            loading: false
        });
    });
    it('should return the current state if action not found', function () {
        expect(reducer(undefined, new MockAction())).toEqual({
            subjects: [],
            selectedSubject: { id: 0, name: '', url: '' },
            loading: false
        });
    });
    it('should return subject information', function () {
        var state = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
        var result = getSubjectList(state);
        expect(result).toEqual(expectedSubjects);
    });
    it('should return error message', function () {
        var state = reducer(undefined, new SubjectActionFailed('I am a failure.'));
        var result = getSubjectList(state);
        expect(result).toEqual([]);
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/subject.reducers.spec.js.map