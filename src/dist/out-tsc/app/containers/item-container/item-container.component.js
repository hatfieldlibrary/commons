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
import { Component, ChangeDetectionStrategy, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromItem from '../../actions/item.actions';
import * as areaActions from '../../actions/area.actions';
import * as fromRelated from '../../actions/related.actions';
import { fadeIn } from '../../animation/animations';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';
var ItemContainerComponent = (function () {
    function ItemContainerComponent(store, renderer, media, route, router, document) {
        var _this = this;
        this.store = store;
        this.renderer = renderer;
        this.media = media;
        this.route = route;
        this.router = router;
        this.document = document;
        this.areasAvailable = false;
        this.activeMediaQuery = 'xs';
        this.columns = 1;
        this.watchers = new Subscription();
        /** Assures that the page scrolls to top if user chooses related item. */
        var routeEventWatcher = this.router.events.filter(function (event) { return event instanceof NavigationEnd; }).subscribe(function () {
            // Chrome canary supports the new standard usage with documentElement, but
            // Chrome and presumably other browsers still expect body.
            _this.renderer.setProperty(_this.document.body, 'scrollTop', 0);
            _this.renderer.setProperty(_this.document.documentElement, 'scrollTop', 0);
        });
        if (routeEventWatcher) {
            this.watchers.add(routeEventWatcher);
        }
        // Set the media observable subscription for assigning the related items column count.
        var mediaWatcher = this.media.subscribe(function (change) {
            _this.activeMediaQuery = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : '';
            if (change.mqAlias === 'xs') {
                _this.columns = 1;
            }
            else if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
                _this.columns = 2;
            }
            else if (change.mqAlias === 'lg') {
                _this.columns = 3;
            }
            else {
                _this.columns = 4;
            }
        });
        if (mediaWatcher) {
            this.watchers.add(mediaWatcher);
        }
    }
    /**
     * Subscribes to areaList observable and sets member variable to true if the array
     * is not empty.
     */
    ItemContainerComponent.prototype.setAreasAvailable = function () {
        var _this = this;
        var areaWatcher = this.store.select(fromRoot.getAreas).subscribe(function (areas) {
            _this.areas = areas;
            // id is 0 in initial state.
            if (areas.length > 0) {
                if (areas[0].id > 0) {
                    _this.areasAvailable = true;
                }
            }
        });
        if (areaWatcher) {
            this.watchers.add(areaWatcher);
        }
    };
    /**
     * Dispatches request for related collections. This requires packaging identifiers
     * from the subjects array for this item into a string.
     * @param data the item object
     */
    ItemContainerComponent.prototype.getRelatedItems = function (data) {
        if (typeof data.subjects !== 'undefined' &&
            typeof this.id !== 'undefined') {
            var subjectString = '';
            for (var _i = 0, _a = data.subjects; _i < _a.length; _i++) {
                var subject = _a[_i];
                subjectString += subject + ',';
            }
            // dispatch if we have subjects
            if (subjectString.length > 0) {
                subjectString = subjectString.slice(0, -1);
                this.store.dispatch(new fromRelated.ItemActionRelated(this.id, subjectString));
            }
        }
    };
    /**
     * Dispatches action for area list if not currently available in the store.
     * @param id
     */
    ItemContainerComponent.prototype.initializeAreas = function () {
        if (!this.areasAvailable) {
            this.store.dispatch(new areaActions.AreaAction());
        }
    };
    /**
     * Set column count for related items.
     */
    ItemContainerComponent.prototype.initializeColumnCount = function () {
        if (this.media.isActive('xs')) {
            this.columns = 1;
        }
        else if (this.media.isActive('sm') || this.media.isActive('md')) {
            this.columns = 2;
        }
        else if (this.media.isActive('lg')) {
            this.columns = 3;
        }
        else {
            this.columns = 4;
        }
    };
    ItemContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.item$ = this.store.select(fromRoot.getItem);
        this.related$ = this.store.select(fromRoot.getRelated);
        this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
        this.setAreasAvailable();
        // Once we have item information, request related items.
        var itemWatcher = this.store.select(fromRoot.getItem).subscribe(function (data) {
            _this.getRelatedItems(data);
        });
        if (itemWatcher) {
            this.watchers.add(itemWatcher);
        }
        // Request item based on route parameter.
        var routeWatcher = this.route.params
            .subscribe(function (params) {
            _this.store.dispatch(new fromItem.ItemReset());
            _this.store.dispatch(new fromRelated.ClearRelatedItems());
            if (params['areaId']) {
                _this.selectedArea = params['areaId'];
            }
            if (params['id']) {
                _this.id = params['id'];
                _this.store.dispatch(new fromItem.ItemRequest(params['id']));
            }
            _this.initializeAreas();
            _this.initializeColumnCount();
        });
        if (routeWatcher) {
            this.watchers.add(routeWatcher);
        }
    };
    ItemContainerComponent.prototype.ngOnDestroy = function () {
        this.watchers.unsubscribe();
        //this.renderer.destroy();
        //  this.router.dispose();
        this.renderer = null;
        // this.document = null;
    };
    ItemContainerComponent = __decorate([
        Component({
            selector: 'app-item-container',
            changeDetection: ChangeDetectionStrategy.Default,
            templateUrl: './item-container.component.html',
            styleUrls: ['./item-container.component.css'],
            animations: [fadeIn]
        }),
        __param(5, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Store,
            Renderer2,
            ObservableMedia,
            ActivatedRoute,
            Router, Object])
    ], ItemContainerComponent);
    return ItemContainerComponent;
}());
export { ItemContainerComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/containers/item-container/item-container.component.js.map