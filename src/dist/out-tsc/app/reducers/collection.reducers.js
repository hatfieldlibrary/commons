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
 * Created by mspalti on 2/22/17.
 */
import { CollectionActionTypes } from "../actions/collection.actions";
var initialState = {
    collections: [],
    loading: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case CollectionActionTypes.LIST_BY_AREA: {
            var id = action.payload;
            if (id === '') {
                return {
                    collections: [],
                    loading: false,
                };
            }
            return Object.assign({}, state, {
                loading: true
            });
        }
        case CollectionActionTypes.LIST_RESET: {
            return initialState;
        }
        case CollectionActionTypes.LIST_BY_AREA_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                collections: result,
                loading: false
            });
        }
        case CollectionActionTypes.LIST_BY_AREA_SUBJECT: {
            var payload = action.payload;
            var id = payload.id;
            var areaId = payload.areaId;
            if (id === '' || areaId === '') {
                return {
                    collections: [],
                    loading: false,
                };
            }
            return Object.assign({}, state, {
                loading: true
            });
        }
        case CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                collections: result,
                loading: false
            });
        }
        case CollectionActionTypes.LIST_ALL_BY_SUBJECT: {
            return Object.assign({}, state, {
                loading: false
            });
        }
        case CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                collections: result,
                loading: false
            });
        }
        case CollectionActionTypes.LIST_ALL_ACTION: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case CollectionActionTypes.LIST_ALL_SUCCESS_ACTION: {
            var result = action.payload;
            return Object.assign({}, state, {
                collections: result,
                loading: false
            });
        }
        case CollectionActionTypes.REQUEST_FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
}
export var getCollectionList = function (state) { return state.collections; };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/collection.reducers.js.map