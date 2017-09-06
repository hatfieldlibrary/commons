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
import { Observable } from 'rxjs/Observable';
import * as related from '../actions/related.actions';
import { RelatedService } from '../services/related.service';
/**
 * Created by mspalti on 4/10/17.
 */
var RelatedEffects = (function () {
    function RelatedEffects(svc, actions$) {
        var _this = this;
        this.svc = svc;
        this.actions$ = actions$;
        this.relatedEffect$ = this.actions$
            .ofType(related.RelatedItemActionTypes.RELATED_COLLECTIONS)
            .map(function (action) { return action.payload; })
            .switchMap(function (payload) { return _this.svc.getRelatedCollections(payload.id, payload.subjectIds); })
            .map(function (res) { return new related.ItemActionRelatedSuccess(res); })
            .catch(function (err) { return Observable.of(new related.RelatedItemRequestFailed(err)); });
    }
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], RelatedEffects.prototype, "relatedEffect$", void 0);
    RelatedEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RelatedService, Actions])
    ], RelatedEffects);
    return RelatedEffects;
}());
export { RelatedEffects };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/effects/related.effects.js.map