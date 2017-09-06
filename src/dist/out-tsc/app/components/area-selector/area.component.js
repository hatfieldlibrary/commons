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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl } from "@angular/forms";
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import * as listActions from '../../actions/collection.actions';
var NavigationComponent = (function () {
    function NavigationComponent(router, formBuilder, store) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.store = store;
    }
    NavigationComponent.prototype.isSelected = function (id) {
        if (this.selectedAreas) {
            return this.selectedAreas.indexOf(id) >= 0;
        }
        return false;
    };
    NavigationComponent.prototype._createIdQueryParam = function (areaList) {
        if (areaList.getRawValue().length = 0) {
            return '0';
        }
        var areaId = '';
        areaList.getRawValue().forEach(function (id) {
            if (id !== '0') {
                areaId += id + ',';
            }
        });
        areaId = areaId.replace(/,\s*$/, '');
        return areaId;
    };
    NavigationComponent.prototype._navigateRoute = function (areaId) {
        // the area id can be a string object of length zero.
        if (areaId !== '0' && areaId.length > 0) {
            this.router.navigate(['/', environment.appRoot, 'collection', 'area', areaId]);
        }
        else {
            this.router.navigate(['/', environment.appRoot, 'collection']);
        }
    };
    NavigationComponent.prototype._removeFromArray = function (index) {
        if (index >= 0) {
            this.areaFormArray.removeAt(index);
        }
    };
    NavigationComponent.prototype._updateAreaFormArray = function (area, checked) {
        if (checked) {
            // Remove the All Collections option from list if other collection area is selected.
            var index = this.areaFormArray.controls.findIndex(function (x) { return x.value == '0'; });
            this._removeFromArray(index);
            // Add the selected collection area to FormArray.
            this.areaFormArray.push(new FormControl(area));
        }
        else {
            // Remove the collection area from FormArray.
            var index = this.areaFormArray.controls.findIndex(function (x) { return x.value == area; });
            this._removeFromArray(index);
        }
    };
    NavigationComponent.prototype.onChange = function (area, event) {
        this.store.dispatch(new listActions.CollectionReset());
        // If the All Collection option is selected, reset the FormArray and navigate.
        if (area === '0') {
            this.areaFormArray.reset(['0']);
            this._navigateRoute(area);
        }
        else {
            // Otherwise, update the FormArray and navigate.
            this._updateAreaFormArray(area, event.checked);
            var areaId = this._createIdQueryParam(this.areaFormArray);
            this._navigateRoute(areaId);
        }
    };
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkboxGroup = this.formBuilder.group({
            areas: this.formBuilder.array([])
        });
        this.formArrayRef = this.checkboxGroup.controls.areas;
        if (this.selectedAreas) {
            this.selectedAreaArray = this.selectedAreas.split(',');
            this.selectedAreaArray.forEach(function (id) {
                _this.formArrayRef.push(new FormControl(id));
            });
        }
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        this.router.dispose();
        // this.router = null;
        // this.formBuilder = null;
        // this.store  = null;
        this.areaFormArray = null;
        this.checkboxGroup = null;
        this.formArrayRef = null;
    };
    NavigationComponent.prototype.ngAfterViewInit = function () {
        this.areaFormArray = this.checkboxGroup.controls.areas;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NavigationComponent.prototype, "areaList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NavigationComponent.prototype, "selectedAreas", void 0);
    NavigationComponent = __decorate([
        Component({
            selector: 'app-navigation-selector',
            templateUrl: 'area.component.html',
            styleUrls: ['area.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            Store])
    ], NavigationComponent);
    return NavigationComponent;
}());
export { NavigationComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/area-selector/area.component.js.map