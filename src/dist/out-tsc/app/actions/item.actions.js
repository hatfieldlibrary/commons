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
import { type } from '../shared/ngrx/type';
export var ItemActionTypes = {
    ITEM_REQUEST: type('[Item] Request Item.'),
    ITEM_SUCCESS: type('[Item] Item Request Response'),
    ITEM_RESET: type('[Item] Item Reset'),
    REQUEST_FAILED: type('[Item] Request Failed'),
    SET_CURRENT_IMAGE: type('[Item] Set Current Image'),
    GET_PREVIOUS_IMAGE: type('[Item] Get Previous Image')
};
var ItemRequest = (function () {
    function ItemRequest(payload) {
        this.payload = payload;
        this.type = ItemActionTypes.ITEM_REQUEST;
    }
    return ItemRequest;
}());
export { ItemRequest };
var ItemSuccess = (function () {
    function ItemSuccess(item) {
        this.type = ItemActionTypes.ITEM_SUCCESS;
        this.payload = item;
    }
    return ItemSuccess;
}());
export { ItemSuccess };
var ItemRequestFailed = (function () {
    function ItemRequestFailed(err) {
        this.type = ItemActionTypes.REQUEST_FAILED;
        console.log(err);
    }
    return ItemRequestFailed;
}());
export { ItemRequestFailed };
var ItemReset = (function () {
    function ItemReset() {
        this.type = ItemActionTypes.ITEM_RESET;
    }
    return ItemReset;
}());
export { ItemReset };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/item.actions.js.map