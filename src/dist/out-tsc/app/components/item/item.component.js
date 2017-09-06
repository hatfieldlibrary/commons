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
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ItemType } from "../../shared/data-types/item.type";
import { SubjectType } from "../../shared/data-types/subject.type";
import { UtilitiesService } from "../../services/utilities.service";
import { SearchService } from "../../services/search.service";
import { Subscription } from "rxjs/Subscription";
import { ObservableMedia } from "@angular/flex-layout";
var ItemComponent = (function () {
    function ItemComponent(svc, utils, media) {
        this.svc = svc;
        this.utils = utils;
        this.media = media;
        this.state = '';
    }
    ItemComponent.prototype.getBackLink = function () {
        var path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
        return path;
    };
    ItemComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['item']) {
            if (changes['item'].currentValue.collection.linkOptions === 'opts') {
                var optionsWatcher = this.svc.getOptionsList(changes['item'].currentValue.collection.url).subscribe(function (list) {
                    _this.optionList = list.result;
                });
                this.watchers.add(optionsWatcher);
            }
        }
    };
    ItemComponent.prototype.ngOnInit = function () {
        this.watchers = new Subscription();
        //
        // let mediaWatcher = this.media.asObservable()
        //   .subscribe((change: MediaChange) => {
        //     this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
        //   });
        // this.watchers.add(mediaWatcher);
    };
    ItemComponent.prototype.ngOnDestroy = function () {
        if (this.watchers) {
            this.watchers.unsubscribe();
        }
        this.svc = null;
        this.utils = null;
        // this.media = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", ItemType)
    ], ItemComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemComponent.prototype, "selectedArea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", SubjectType)
    ], ItemComponent.prototype, "selectedSubject", void 0);
    ItemComponent = __decorate([
        Component({
            selector: 'app-item',
            templateUrl: './item.component.html',
            styleUrls: ['./item.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [SearchService,
            UtilitiesService,
            ObservableMedia])
    ], ItemComponent);
    return ItemComponent;
}());
export { ItemComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item/item.component.js.map