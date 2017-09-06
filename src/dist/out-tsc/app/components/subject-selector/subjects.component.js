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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as listActions from '../../actions/collection.actions';
var SubjectsComponent = (function () {
    /**
     * Injecting ChangeDetectorRef to instruct angular to re-render
     * the view after changes made in the ngAfterViewInit hook method.
     * @param changeDetector
     */
    function SubjectsComponent(changeDetector, media, store) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.media = media;
        this.store = store;
        this.defaultOffset = 100;
        this.leftScroll = 0;
        this.isMobile = true;
        this.leftIsVisible = false;
        this.rightIsVisible = false;
        this.appRoot = environment.appRoot;
        this.watcher = new Subscription();
        var mediaWatcher = this.media.subscribe(function (change) {
            if (change.mqAlias === 'xs') {
                _this.isMobile = true;
            }
            else {
                _this.isMobile = false;
            }
        });
        this.watcher.add(mediaWatcher);
    }
    /**
     * Listen for window resize and adjust navigation arrows.
     * @param event
     */
    SubjectsComponent.prototype.onResize = function (event) {
        // on window resize, recheck the container element width.
        this.offsetWidth = this.container.nativeElement.offsetWidth;
        this.showSubjectNavigationArrow();
    };
    SubjectsComponent.prototype.resetList = function () {
        this.store.dispatch(new listActions.CollectionReset());
    };
    /**
     * Set up media watcher.
     */
    SubjectsComponent.prototype.ngOnInit = function () {
    };
    /**
     * Unsubscribe media watcher.
     */
    SubjectsComponent.prototype.ngOnDestroy = function () {
        this.watcher.unsubscribe();
        this.changeDetector.detach();
        // this.changeDetector = null;
        // this.media = null;
        //   this.animation = null;
        //   this.container = null;
        //   this.contentEls = null;
        //   this.subjects = null;
        //   this.store = null;
    };
    /**
     * Response to scroll event in component by updating the
     * left scroll position and calling function to update navigation
     * arrow visibility.
     * @param event
     */
    SubjectsComponent.prototype.onScroll = function (event) {
        this.leftScroll = event.srcElement.scrollLeft;
        this.showSubjectNavigationArrow();
    };
    SubjectsComponent.prototype._setAnimiationLimit = function (direction) {
        var check;
        if (direction === 'right') {
            if (this.subjects.nativeElement.scrollLeft + this.offsetWidth >= this.subjects.nativeElement.offsetWidth) {
                check = this.subjects.nativeElement.offsetWidth - 1;
            }
            else {
                check = this.subjects.nativeElement.scrollLeft + this.offsetWidth;
            }
        }
        if (direction === 'left') {
            if (this.subjects.nativeElement.scrollLeft - this.offsetWidth >= this.offsetWidth) {
                check = this.subjects.nativeElement.scrollLeft - this.offsetWidth;
            }
            else {
                check = 0;
            }
        }
        return check;
    };
    /**
     * Using setInterval to animate horizontal scroll.
     * @param direction the direction to scroll
     */
    SubjectsComponent.prototype.onScrollRequest = function (direction) {
        var _this = this;
        // Set animation counter.
        var animationCouter;
        if (direction === 'right') {
            animationCouter = 0;
        }
        if (direction === 'left') {
            animationCouter = this.subjects.nativeElement.scrollLeft;
        }
        // Set the animation limit.
        var limit = this._setAnimiationLimit(direction);
        var interval = 20;
        // Start the animation.
        this.animation = setInterval(function () {
            if (direction === 'right') {
                animationCouter = animationCouter + interval;
                _this.subjects.nativeElement.scrollLeft = _this.subjects.nativeElement.scrollLeft + interval;
            }
            if (direction === 'left') {
                if (_this.subjects.nativeElement.scrollLeft >= 0) {
                    animationCouter = animationCouter - interval;
                    _this.subjects.nativeElement.scrollLeft = _this.subjects.nativeElement.scrollLeft - interval;
                }
            }
            // Stop the animation.
            if (direction === 'right') {
                if (animationCouter >= limit - 25) {
                    clearInterval(_this.animation);
                }
            }
            if (direction === 'left') {
                if (animationCouter <= limit || animationCouter === 0) {
                    clearInterval(_this.animation);
                }
            }
        }, 5);
    };
    /**
     * Hook method.
     * See https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
     */
    SubjectsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.offsetWidth = this.container.nativeElement.offsetWidth;
        var changeWatcher = this.contentEls.changes.subscribe(function (el) {
            _this.lastSubjectButton = el._results[_this.subjectList.length - 1];
            var leftOffset = _this.lastSubjectButton.nativeElement.lastElementChild.offsetLeft;
            _this.lastButtonWidth = _this.lastSubjectButton.nativeElement.lastElementChild.offsetWidth;
            _this.selectorWidth = leftOffset + _this.lastButtonWidth;
            _this.showSubjectNavigationArrow();
            _this.changeDetector.detectChanges();
        });
        this.watcher.add(changeWatcher);
    };
    /**
     * Sets visibility of horizontal navigation arrows based on the
     * value of previously set member variables.
     */
    SubjectsComponent.prototype.showSubjectNavigationArrow = function () {
        if (this.selectorWidth > this.offsetWidth) {
            this.rightIsVisible = true;
        }
        else {
            this.leftIsVisible = false;
            this.rightIsVisible = false;
            return;
        }
        if ((this.leftScroll - this.defaultOffset) > 0) {
            this.leftIsVisible = true;
        }
        else {
            this.leftIsVisible = false;
        }
        if ((this.leftScroll + this.offsetWidth + this.lastButtonWidth) >= this.selectorWidth + this.defaultOffset) {
            this.rightIsVisible = false;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SubjectsComponent.prototype, "subjectList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SubjectsComponent.prototype, "areaId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SubjectsComponent.prototype, "type", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], SubjectsComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('list', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], SubjectsComponent.prototype, "subjects", void 0);
    __decorate([
        ViewChildren('subjects', { read: ElementRef }),
        __metadata("design:type", QueryList)
    ], SubjectsComponent.prototype, "contentEls", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SubjectsComponent.prototype, "onResize", null);
    SubjectsComponent = __decorate([
        Component({
            selector: 'app-subject-selector',
            templateUrl: 'subjects.component.html',
            styleUrls: ['subjects.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            ObservableMedia,
            Store])
    ], SubjectsComponent);
    return SubjectsComponent;
}());
export { SubjectsComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/subject-selector/subjects.component.js.map