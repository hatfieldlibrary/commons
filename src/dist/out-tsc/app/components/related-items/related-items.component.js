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
import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';
var RelatedItemsComponent = (function () {
    function RelatedItemsComponent() {
        this.appRoot = environment.appRoot;
        this.imagePath = environment.apiHost + environment.imagePath;
    }
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], RelatedItemsComponent.prototype, "related", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RelatedItemsComponent.prototype, "selectedArea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RelatedItemsComponent.prototype, "columns", void 0);
    RelatedItemsComponent = __decorate([
        Component({
            selector: 'app-related-items',
            templateUrl: './related-items.component.html',
            styleUrls: ['./related-items.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], RelatedItemsComponent);
    return RelatedItemsComponent;
}());
export { RelatedItemsComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/related-items/related-items.component.js.map