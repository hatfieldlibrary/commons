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
import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { MdSidenav } from "@angular/material";
import { NavigationEnd, Router } from "@angular/router";
import { UtilitiesService } from "../../services/utilities.service";
import { SubjectType } from "../../shared/data-types/subject.type";
import { ObservableMedia } from "@angular/flex-layout";
import { DOCUMENT } from "@angular/common";
var AppMenusComponent = (function () {
    function AppMenusComponent(utils, router, media, document) {
        var _this = this;
        this.utils = utils;
        this.router = router;
        this.media = media;
        this.document = document;
        this.previousUrl = '';
        this.homeUrl = 'http://libmedia.willamette.edu/academiccommons';
        this.secondaryUrl = 'http://library.willamette.edu';
        this.tertiaryUrl = 'http://www.willamette.edu';
        this.state = '';
        this.listener = router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.previousUrl = event.url;
        });
        var mediaWatcher = media.asObservable()
            .subscribe(function (change) {
            _this.state = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : '';
        });
    }
    AppMenusComponent.prototype.goToHome = function () {
        document.location.href = this.homeUrl;
    };
    AppMenusComponent.prototype.goToSecondary = function () {
        document.location.href = this.secondaryUrl;
    };
    AppMenusComponent.prototype.goToTertiary = function () {
        document.location.href = this.tertiaryUrl;
    };
    AppMenusComponent.prototype.openMenu = function () {
        this.sideNavigate.open();
    };
    AppMenusComponent.prototype.getBackLink = function () {
        var path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
        return path;
    };
    AppMenusComponent.prototype.ngOnInit = function () {
        if (this.sideNavigate.close) {
            this.sideNavigate.close();
        }
    };
    AppMenusComponent.prototype.ngOnDestroy = function () {
        this.listener.unsubscribe();
        this.router.dispose();
        //   this.router = null;
        // //  this.media = null;
        //   this.utils = null;
        //  this.document = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AppMenusComponent.prototype, "areaList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AppMenusComponent.prototype, "selectedArea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", SubjectType)
    ], AppMenusComponent.prototype, "selectedSubject", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppMenusComponent.prototype, "showBack", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AppMenusComponent.prototype, "title", void 0);
    __decorate([
        ViewChild('sidenav'),
        __metadata("design:type", MdSidenav)
    ], AppMenusComponent.prototype, "sideNavigate", void 0);
    AppMenusComponent = __decorate([
        Component({
            selector: 'app-menus-component',
            templateUrl: './app-menus.component.html',
            styleUrls: ['./app-menus.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(3, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [UtilitiesService,
            Router,
            ObservableMedia, Object])
    ], AppMenusComponent);
    return AppMenusComponent;
}());
export { AppMenusComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/apps-menu/app-menus.component.js.map