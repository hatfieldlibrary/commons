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
import { ItemActionTypes } from "../actions/item.actions";
var initialCollection = {
    id: 0,
    title: '',
    image: '',
    url: '',
    searchUrl: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
};
var initialCategory = {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
};
var initialItemTypes = [{
        id: 0,
        name: '',
        icon: ''
    }];
var initialState = {
    item: {
        collection: initialCollection,
        category: initialCategory,
        itemTypes: initialItemTypes,
        subjects: []
    },
    loading: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ItemActionTypes.ITEM_REQUEST: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case ItemActionTypes.ITEM_SUCCESS: {
            var result = action.payload;
            return Object.assign({}, state, {
                item: result,
                loading: false
            });
        }
        case ItemActionTypes.ITEM_RESET: {
            return Object.assign({}, {
                item: {
                    collection: initialCollection,
                    category: initialCategory,
                    itemTypes: initialItemTypes,
                    subjects: []
                },
                loading: true
            });
        }
        case ItemActionTypes.REQUEST_FAILED: {
            return state;
        }
        default:
            return state;
    }
}
export var getItem = function (state) { return state.item; };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/item.reducers.js.map