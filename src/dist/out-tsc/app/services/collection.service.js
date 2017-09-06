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
import { Http } from "@angular/http";
import { environment } from '../environments/environment';
var CollectionService = (function () {
    function CollectionService(http) {
        this.http = http;
    }
    CollectionService.prototype.getCollectionsByAreaId = function (id) {
        // temporary test data source
        return this.http.get(environment.apiHost + environment.apiRoot + '/collection/area/' + id)
            .map(function (res) { return res.json(); });
    };
    CollectionService.prototype.getCollectionsByAreaSubject = function (id, areaId) {
        return this.http.get(environment.apiHost + environment.apiRoot + '/collection/subject/' + id + '/area/' + areaId)
            .map(function (res) { return res.json(); });
    };
    CollectionService.prototype.getCollectionsBySubject = function (id) {
        return this.http.get(environment.apiHost + environment.apiRoot + '/collection/subject/' + id)
            .map(function (res) { return res.json(); });
    };
    CollectionService.prototype.getAllCollections = function () {
        return this.http.get(environment.apiHost + environment.apiRoot + '/collection')
            .map(function (res) { return res.json(); });
    };
    CollectionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], CollectionService);
    return CollectionService;
}());
export { CollectionService };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/collection.service.js.map