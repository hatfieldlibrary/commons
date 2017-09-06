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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { SelectedSubject } from '../../shared/data-types/selected-subject';
import { Store } from '@ngrx/store';
import * as listActions from '../../actions/collection.actions';
var ListComponent = (function () {
    function ListComponent(store) {
        this.store = store;
        this.rootPath = environment.appRoot;
        this.removeSubject = new EventEmitter();
        this.filterTerm = '';
    }
    ListComponent.prototype.deselect = function () {
        this.store.dispatch(new listActions.CollectionReset());
        this.removeSubject.next();
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.removeSubject.unsubscribe();
        // this.removeSubject = null;
        // this.selectedArea = null;
        // this.collectionList = null;
        // this.selectedSubject = null;
        // this.store = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListComponent.prototype, "collectionList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", SelectedSubject)
    ], ListComponent.prototype, "selectedSubject", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ListComponent.prototype, "removeSubject", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListComponent.prototype, "selectedArea", void 0);
    ListComponent = __decorate([
        Component({
            selector: 'app-collection-list',
            templateUrl: 'list.component.html',
            styleUrls: ['list.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [Store])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/collection-list/list.component.js.map