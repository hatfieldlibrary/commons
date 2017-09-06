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
import { AreaActionTypes } from "../actions/area.actions";
var initialState = {
    area: [{
            id: 0,
            title: '',
            linkLabel: '',
            url: '',
            searchUrl: '',
            description: '',
            position: 0
        }],
    loading: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AreaActionTypes.AREA_INFORMATION: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case AreaActionTypes.AREA_INFORMATION_SUCCESS: {
            var payload = action.payload;
            return Object.assign({}, state, {
                area: payload,
                loading: false
            });
        }
        default:
            return state;
    }
}
export var getAreaInfo = function (state) { return state.area; };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/area.reducers.js.map