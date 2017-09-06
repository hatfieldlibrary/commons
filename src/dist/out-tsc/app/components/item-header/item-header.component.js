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
import { ItemType } from "../../shared/data-types/item.type";
import { ObservableMedia } from "@angular/flex-layout";
var ItemHeaderComponent = (function () {
    function ItemHeaderComponent(media) {
        var _this = this;
        this.media = media;
        this.isMobile = false;
        this.watcher = this.media.subscribe(function (change) {
            if (change.mqAlias === 'xs') {
                _this.isMobile = true;
            }
            else {
                _this.isMobile = false;
            }
        });
    }
    ItemHeaderComponent.prototype.ngOnInit = function () {
    };
    ItemHeaderComponent.prototype.ngOnDestroy = function () {
        if (this.watcher) {
            this.watcher.unsubscribe();
        }
        //this.media = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", ItemType)
    ], ItemHeaderComponent.prototype, "item", void 0);
    ItemHeaderComponent = __decorate([
        Component({
            selector: 'app-item-header',
            templateUrl: 'item-header.component.html',
            styleUrls: ['item-header.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ObservableMedia])
    ], ItemHeaderComponent);
    return ItemHeaderComponent;
}());
export { ItemHeaderComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-header/item-header.component.js.map