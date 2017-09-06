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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as areas from '../actions/area.actions';
import { Observable } from 'rxjs/Observable';
import { AreaService } from '../services/area.service';
var AreaEffects = (function () {
    function AreaEffects(svc, actions$) {
        var _this = this;
        this.svc = svc;
        this.actions$ = actions$;
        this.areaListEffect$ = this.actions$
            .ofType(areas.AreaActionTypes.AREA_LIST)
            .map(function (action) { return action.payload; })
            .switchMap(function () { return _this.svc.getAreaList(); })
            .map(function (res) { console.log(res); return new areas.AreaActionSuccess(res); })
            .catch(function (err) { return Observable.of(new areas.AreaActionFailed(err)); });
        this.areaInfoEffect$ = this.actions$
            .ofType(areas.AreaActionTypes.AREA_INFORMATION)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.svc.getAreaInfo(id); })
            .map(function (res) { return new areas.AreaInformationSuccess(res); })
            .catch(function (err) { return Observable.of(new areas.AreaActionFailed(err)); });
    }
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], AreaEffects.prototype, "areaListEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], AreaEffects.prototype, "areaInfoEffect$", void 0);
    AreaEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AreaService, Actions])
    ], AreaEffects);
    return AreaEffects;
}());
export { AreaEffects };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/effects/area.effects.js.map