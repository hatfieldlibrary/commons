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
import { AreaAction, AreaActionSuccess } from "../actions/area.actions";
import { getAreaList, reducer } from "./area-list.reducers";
/**
 * Created by mspalti on 4/15/17.
 */
var areaListTypeMock = [
    {
        id: 1,
        title: 'test area one',
        count: 2
    }, {
        id: 2,
        title: 'test area two',
        count: 1
    }
];
var defaultState = [
    {
        id: 0,
        title: '',
        count: 0
    }
];
describe('Area List Reducer', function () {
    it('should return the initial default area state and loading true.', function () {
        expect(reducer(undefined, new AreaAction('1'))).toEqual({
            areaList: defaultState,
            loading: true
        });
    });
    it('should return area list', function () {
        var areaState = { areaList: areaListTypeMock, loading: true };
        var state = reducer(areaState, new AreaActionSuccess(areaListTypeMock));
        var result = getAreaList(state);
        expect(result).toEqual(areaListTypeMock);
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/area-list.reducers.spec.js.map