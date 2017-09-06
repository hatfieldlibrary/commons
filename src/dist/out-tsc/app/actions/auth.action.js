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
export var AuthActionTypes = {
    GET_AUTH_STATUS: type('[Auth] Get Auth Status'),
    SET_AUTH_STATUS: type('[Auth] Set Auth Status')
};
/**
 * Factory for the request all areaList action.
 */
var GetAuthStatus = (function () {
    function GetAuthStatus(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.GET_AUTH_STATUS;
    }
    return GetAuthStatus;
}());
export { GetAuthStatus };
/**
 * Factory for the areaList received action.
 */
var SetAuthStatus = (function () {
    function SetAuthStatus(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.SET_AUTH_STATUS;
    }
    return SetAuthStatus;
}());
export { SetAuthStatus };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/actions/auth.action.js.map