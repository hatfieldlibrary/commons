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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RequestMethod, RequestOptions } from "@angular/http";
/**
 * Extends RequestOptions for possible later use with session header.
 * Created by mspalti on 4/25/17.
 */
var GlobalHttpOptions = (function (_super) {
    __extends(GlobalHttpOptions, _super);
    function GlobalHttpOptions() {
        return _super.call(this, {
            method: RequestMethod.Get,
        }) || this;
    }
    return GlobalHttpOptions;
}(RequestOptions));
export { GlobalHttpOptions };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/shared/global-request.js.map