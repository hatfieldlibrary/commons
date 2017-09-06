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
import { reducer } from './area.reducers';
import { AreaActionFailed, AreaInformation, AreaInformationSuccess } from '../actions/area.actions';
/**
 * Created by mspalti on 3/24/17.
 */
var areaListTypeMock = [
    {
        id: 1,
        title: 'test area one',
        count: 2
    }, {
        id: 2,
        title: 'test area tw0',
        count: 1
    }
];
var areaMock = [{
        id: 1,
        title: 'Archival Collections',
        linkLabel: 'Area Button Label',
        url: 'Area URL',
        searchUrl: 'Area Search URL',
        description: 'Description Two.',
        position: 2
    }];
var initialState = [{
        id: 0,
        title: '',
        linkLabel: '',
        url: '',
        searchUrl: '',
        description: '',
        position: 0
    }];
var MockAction = (function () {
    function MockAction() {
    }
    return MockAction;
}());
describe('Area Reducer', function () {
    it('should return state with area information', function () {
        expect(reducer(undefined, new AreaInformation('1'))).toEqual({
            area: initialState,
            loading: true
        });
    });
    it('should return the current state', function () {
        var areaState = { area: areaMock, loading: false };
        expect(reducer(areaState, new MockAction())).toEqual({
            area: areaMock,
            loading: false
        });
    });
    it('should return state with updated area information', function () {
        var areaState = { area: areaMock, loading: true };
        expect(reducer(areaState, new AreaInformationSuccess(areaMock))).toEqual({
            area: areaMock,
            loading: false
        });
    });
    it('should return current state and fail.', function () {
        var areaState = { area: areaMock, loading: false };
        expect(reducer(areaState, new AreaActionFailed('error'))).toEqual({
            area: areaMock,
            loading: false
        });
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/area.reducers.spec.js.map