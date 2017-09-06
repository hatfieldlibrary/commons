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
import { RelatedItemActionTypes } from '../actions/related.actions';
var initialState = {
    related: [],
    loading: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case RelatedItemActionTypes.RELATED_COLLECTIONS: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case RelatedItemActionTypes.RELATED_COLLECTIONS_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                related: result,
                loading: false
            });
        }
        case RelatedItemActionTypes.CLEAR_RELATED_COLLECTIONS: {
            return Object.assign({}, state, {
                related: [],
                loading: false
            });
        }
        default:
            return state;
    }
}
export var getRelatedList = function (state) { return state.related; };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/related.reducers.js.map