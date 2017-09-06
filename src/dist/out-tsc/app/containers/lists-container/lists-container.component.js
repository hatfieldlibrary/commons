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
 * The main container component for subject selector, area selector and collection
 * list components
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../environments/environment';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectAction from '../../actions/subject-actions';
import { fadeIn } from '../../animation/animations';
import { Subscription } from 'rxjs/Subscription';
import { ObservableMedia } from '@angular/flex-layout';
var ListsContainerComponent = (function () {
    function ListsContainerComponent(store, route, router, media) {
        this.store = store;
        this.route = route;
        this.router = router;
        this.media = media;
        this.state = '';
        // All component subscriptions will be added to this object.
        this.watchers = new Subscription();
    }
    /**
     * Subscribes to areaList observable and sets member variable to true if the array
     * is not empty.
     */
    ListsContainerComponent.prototype.setAreasAvailable = function () {
        var _this = this;
        var areasWatcher = this.store.select(fromRoot.getAreas).subscribe(function (areas) {
            // id is 0 in initial state.
            if (areas[0].id > 0) {
                _this.areas = areas;
                _this.areasAvailable = true;
            }
        });
        this.watchers.add(areasWatcher);
    };
    ListsContainerComponent.prototype._setAllCollectionTitle = function () {
        this.title = 'All Collections';
    };
    ListsContainerComponent.prototype.setItemTitle = function () {
        var _this = this;
        var areaInfoWatcher = this.store.select(fromRoot.getAreaInfo).subscribe(function (info) {
            _this.title = '';
            _this.subtitle = '';
            // If the local areaId field is set to '0' then just use
            // the default title.
            if (_this.areaId === '0') {
                _this._setAllCollectionTitle();
            }
            else if (info.length > 1) {
                // Multiple areas selected, use subtitle format for multiple area info.
                info.forEach(function (area) { return _this.subtitle += area.title + ' / '; });
                _this.subtitle = _this.subtitle.substring(0, _this.subtitle.length - 2);
            }
            else if (info[0].title.length > 0) {
                // Otherwise update the title using the new single area information.
                _this.title = info[0].title;
            }
            else {
                _this._setAllCollectionTitle();
            }
        });
        this.watchers.add(areaInfoWatcher);
    };
    /**
     * Dispatches action for collections by subject and area.
     * @param subjectId
     * @param areaId
     */
    ListsContainerComponent.prototype.getCollectionsBySubject = function (subjectId, areaId) {
        this.store.dispatch(new listActions.CollectionSubjectAction(subjectId, areaId));
        this.store.dispatch(new subjectAction.CurrentSubject(+subjectId));
        this.getAreaInformation(areaId);
        this._setSelectedSubject(subjectId);
    };
    /**
     * Dispatches action for collections in an area.
     * @param areaId
     */
    ListsContainerComponent.prototype.getCollectionsByArea = function (areaId) {
        this.store.dispatch(new listActions.CollectionAction(areaId));
        this.store.dispatch(new subjectAction.RemoveCurrentSubject());
    };
    /**
     * Dispatches action to fetch all collections.
     */
    ListsContainerComponent.prototype.getAllCollections = function () {
        this.title = 'All Collections';
        this.store.dispatch(new listActions.AllCollectionsAction());
        this.store.dispatch(new subjectAction.AllSubjectAction());
        this.store.dispatch(new subjectAction.RemoveCurrentSubject());
    };
    /**
     * Wrapper for collection actions.
     * @param areaId
     */
    ListsContainerComponent.prototype.getCollections = function (areaId) {
        this.getCollectionsByArea(areaId);
        this.getAreaInformation(areaId);
    };
    /**
     * Dispatches action for area information and for list of
     * subjects assigned to the area..
     * @param areaId
     */
    ListsContainerComponent.prototype.getAreaInformation = function (areaId) {
        this.store.dispatch(new areaActions.AreaInformation(areaId));
        this.store.dispatch((new subjectAction.SubjectAction((areaId))));
        this._setSelectedSubject('-1');
    };
    /**
     * Dispatches request for all collections that have the given subject.
     *
     * Also dispatches request for list of subjects. This assures that subjects
     * are in the store when user links directly to this page. If global subjects
     * are implemented in the final product, it may make sense to assign these
     * to their own reducer, since the state of the global list will not change.
     * That way we can initialize once.
     *
     * @param subjectId
     */
    ListsContainerComponent.prototype.getAllCollectionsForSubject = function (subjectId) {
        this.store.dispatch((new listActions.AllCollectionSubjectAction(subjectId)));
        this.store.dispatch(new subjectAction.AllSubjectAction());
        this._setSelectedSubject(subjectId);
    };
    /**
     * Dispatches update for selected subject.
     * @param {string} subjectId
     * @private
     */
    ListsContainerComponent.prototype._setSelectedSubject = function (subjectId) {
        this.store.dispatch(new subjectAction.CurrentSubject(+subjectId));
    };
    /**
     * Dispatches action for area list if not currently available in the store.
     * @param id
     */
    ListsContainerComponent.prototype.initializeAreas = function () {
        if (!this.areasAvailable) {
            this.store.dispatch(new areaActions.AreaAction());
        }
    };
    ListsContainerComponent.prototype.removeSubject = function (event) {
        if (this.areaId && this.areaId !== '0') {
            this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId);
        }
        else {
            this.router.navigateByUrl('/' + environment.appRoot + '/collection');
        }
    };
    ListsContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setItemTitle();
        this.setAreasAvailable();
        this.collections$ = this.store.select(fromRoot.getCollections);
        this.subjects$ = this.store.select(fromRoot.getSubject);
        this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
        this.areas$ = this.store.select(fromRoot.getAreas);
        this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
        var mediaWatcher = this.media.asObservable()
            .subscribe(function (change) {
            _this.state = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : '';
        });
        this.watchers.add(mediaWatcher);
        var routeWatcher = this.route.params
            .subscribe(function (params) {
            _this.subtitle = '';
            _this.initializeAreas();
            if (params['areaId']) {
                _this.areaId = params['areaId'];
                _this.subjectLinkType = 'area';
                if (params['subjectId']) {
                    _this.subjectId = params['subjectId'];
                    _this.getCollectionsBySubject(params['subjectId'], params['areaId']);
                }
                else {
                    _this.getCollections(params['areaId']);
                }
            }
            else if (params['subjectId']) {
                _this.subjectId = params['subjectId'];
                _this.subjectLinkType = 'all';
                _this.homeScreen = true;
                _this.getAllCollectionsForSubject(params['subjectId']);
                _this._setAllCollectionTitle();
                _this.areaId = '0';
            }
            else {
                _this.subjectLinkType = 'all';
                _this.getAllCollections();
                _this.homeScreen = true;
                _this.areaId = '0';
            }
        });
        this.watchers.add(routeWatcher);
    };
    ListsContainerComponent.prototype.ngOnDestroy = function () {
        this.watchers.unsubscribe();
        this.router.dispose();
    };
    ListsContainerComponent = __decorate([
        Component({
            selector: 'app-lists-container',
            changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: 'lists-container.component.html',
            styleUrls: ['lists-container.component.css'],
            animations: [fadeIn]
        }),
        __metadata("design:paramtypes", [Store,
            ActivatedRoute,
            Router,
            ObservableMedia])
    ], ListsContainerComponent);
    return ListsContainerComponent;
}());
export { ListsContainerComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/containers/lists-container/lists-container.component.js.map