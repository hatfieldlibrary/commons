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
import { AreaType } from "../../shared/data-types/area.type";
import { SelectedSubject } from "app/shared/data-types/selected-subject";
var AreaInformationComponent = (function () {
    function AreaInformationComponent() {
    }
    AreaInformationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.areaInfo) {
            if (changes.areaInfo.currentValue.length > 1) {
                var areaList = changes.areaInfo.currentValue;
                var areaTitles_1 = '';
                areaList.forEach(function (area) { return areaTitles_1 += area.title + ', '; });
                areaTitles_1 = areaTitles_1.slice(0, -2);
                this.description = 'Viewing collection areas: <span class="area-color">' + areaTitles_1 + '</span>';
                this.url = '';
                this.linkLabel = '';
                this.title = '';
            }
            else {
                this.title = changes.areaInfo.currentValue[0].title;
                this.description = changes.areaInfo.currentValue[0].description;
                this.url = changes.areaInfo.currentValue[0].url;
                this.linkLabel = changes.areaInfo.currentValue[0].linkLabel;
            }
        }
    };
    AreaInformationComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", SelectedSubject)
    ], AreaInformationComponent.prototype, "selectedSubject", void 0);
    __decorate([
        Input(),
        __metadata("design:type", AreaType)
    ], AreaInformationComponent.prototype, "areaInfo", void 0);
    AreaInformationComponent = __decorate([
        Component({
            selector: 'app-area-information',
            templateUrl: './area-information.component.html',
            styleUrls: ['./area-information.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], AreaInformationComponent);
    return AreaInformationComponent;
}());
export { AreaInformationComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/area-information/area-information.component.js.map