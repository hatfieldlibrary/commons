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
/**
 * Created by mspalti on 2/21/17.
 */
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { CollectionService } from "../services/collection.service";
import * as collection from '../actions/collection.actions';
var CollectionEffects = (function () {
    function CollectionEffects(svc, actions$) {
        var _this = this;
        this.svc = svc;
        this.actions$ = actions$;
        this.collectionsByArea$ = this.actions$
            .ofType(collection.CollectionActionTypes.LIST_BY_AREA)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.svc.getCollectionsByAreaId(id); })
            .map(function (res) { return new collection.CollectionActionSuccess(res); })
            .catch(function (err) { return Observable.of(new collection.CollectionActionFailed(err)); });
        this.collectionsBySubjectArea$ = this.actions$
            .ofType(collection.CollectionActionTypes.LIST_BY_AREA_SUBJECT)
            .map(function (action) { return action.payload; })
            .switchMap(function (payload) { return _this.svc.getCollectionsByAreaSubject(payload.id, payload.areaId); })
            .map(function (res) { return new collection.CollectionSubjectActionSuccess(res); })
            .catch(function (err) { return Observable.of(new collection.CollectionActionFailed(err)); });
        this.collectionsBySubject$ = this.actions$
            .ofType(collection.CollectionActionTypes.LIST_ALL_BY_SUBJECT)
            .map(function (action) { return action.payload; })
            .switchMap(function (payload) { return _this.svc.getCollectionsBySubject(payload); })
            .map(function (res) { return new collection.AllCollectionSubjectActionSuccess(res); })
            .catch(function (err) { return Observable.of(new collection.CollectionActionFailed(err)); });
        this.collectionsAll$ = this.actions$
            .ofType(collection.CollectionActionTypes.LIST_ALL_ACTION)
            .switchMap(function () { return _this.svc.getAllCollections(); })
            .map(function (res) { return new collection.AllCollectionsActionSuccess(res); })
            .catch(function (err) { return Observable.of(new collection.CollectionActionFailed(err)); });
    }
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], CollectionEffects.prototype, "collectionsByArea$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], CollectionEffects.prototype, "collectionsBySubjectArea$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], CollectionEffects.prototype, "collectionsBySubject$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], CollectionEffects.prototype, "collectionsAll$", void 0);
    CollectionEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CollectionService, Actions])
    ], CollectionEffects);
    return CollectionEffects;
}());
export { CollectionEffects };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/effects/collection.effects.js.map