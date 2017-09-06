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
export var AreaActionTypes = {
    AREA_LIST: type('[Areas] List Areas Request'),
    AREA_LIST_SUCCESS: type('[Areas] List All Areas Response'),
    REQUEST_FAILED: type('[Areas] Search Failed'),
    AREA_INFORMATION: type('[Areas] Information for current area'),
    AREA_INFORMATION_SUCCESS: type('[Areas] Update area information')
};
/**
 * Factory for the request all areaList action.
 */
var AreaAction = (function () {
    function AreaAction(payload) {
        if (payload === void 0) { payload = null; }
        this.payload = payload;
        this.type = AreaActionTypes.AREA_LIST;
    }
    return AreaAction;
}());
export { AreaAction };
/**
 * Factory for the areaList received action.
 */
var AreaActionSuccess = (function () {
    function AreaActionSuccess(payload) {
        this.payload = payload;
        this.type = AreaActionTypes.AREA_LIST_SUCCESS;
    }
    return AreaActionSuccess;
}());
export { AreaActionSuccess };
/**
 * Factory for the areaList request failed action.
 */
var AreaActionFailed = (function () {
    function AreaActionFailed(err) {
        this.type = AreaActionTypes.REQUEST_FAILED;
        console.log(err);
    }
    return AreaActionFailed;
}());
export { AreaActionFailed };
/**
 * Factory for the action used to initialize collection
 * information with load of the area list.
 */
var AreaInformation = (function () {
    function AreaInformation(payload) {
        this.payload = payload;
        this.type = AreaActionTypes.AREA_INFORMATION;
    }
    return AreaInformation;
}());
export { AreaInformation };
/**
 * Factory for the action used to update area information.
 */
var AreaInformationSuccess = (function () {
    function AreaInformationSuccess(payload) {
        this.payload = payload;
        this.type = AreaActionTypes.AREA_INFORMATION_SUCCESS;
    }
    return AreaInformationSuccess;
}());
export { AreaInformationSuccess };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/area.actions.js.map