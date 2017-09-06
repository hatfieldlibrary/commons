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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DOCUMENT } from '@angular/common';
var ItemSelectComponent = (function () {
    function ItemSelectComponent(svc, document) {
        this.svc = svc;
        this.document = document;
        this.isAuthenticated = false;
        this.SEARCH_OPTIONS_LABEL = 'Browse by Date';
    }
    ItemSelectComponent.prototype.optionSearch = function (term) {
        var href = this.svc.getOptionsQuery(this.url, term);
        this.document.location.href = href;
    };
    ItemSelectComponent.prototype.ngOnDestroy = function () {
        this.svc = null;
        this.document = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ItemSelectComponent.prototype, "optionList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemSelectComponent.prototype, "url", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ItemSelectComponent.prototype, "restricted", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ItemSelectComponent.prototype, "isAuthenticated", void 0);
    ItemSelectComponent = __decorate([
        Component({
            selector: 'app-item-select-component',
            templateUrl: './item-select.component.html',
            styleUrls: ['./item-select.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(1, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [SearchService, Object])
    ], ItemSelectComponent);
    return ItemSelectComponent;
}());
export { ItemSelectComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-select-options/item-select.component.js.map