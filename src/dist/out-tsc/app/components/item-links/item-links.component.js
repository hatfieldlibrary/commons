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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SearchTerms } from '../../shared/data-types/simple-search.type';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthCheckService } from '../../services/auth-check.service';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';
var ItemLinksComponent = (function () {
    function ItemLinksComponent(svc, route, auth, changeDetector, store, document) {
        var _this = this;
        this.svc = svc;
        this.route = route;
        this.auth = auth;
        this.changeDetector = changeDetector;
        this.store = store;
        this.document = document;
        this.COLLECTION_BUTTON_LABEL = 'Browse the Collection';
        this.ITEM_BUTTON_LABEL = 'View this Item';
        this.SEARCH_OPTIONS_LABEL = 'Select to Browse';
        this.isAuthenticated = false;
        this.watchers = new Subscription();
        var url = this.route.url.map(function (segments) { return segments.join('/'); });
        var urlWatcher = url.subscribe(function (path) {
            _this.authenticationPath = environment.authPath + '/' + path;
        });
        this.watchers.add(urlWatcher);
    }
    ItemLinksComponent.prototype.simpleSearch = function () {
        var href = this.svc.executeSimpleSearchQuery(this.searchUrl, this.model.terms);
        this.document.location.href = href;
    };
    ItemLinksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new SearchTerms();
        this.auth$ = this.store.select(fromRoot.getAuthStatus);
        var authWatcher = this.auth$.subscribe(function (auth) {
            _this.isAuthenticated = auth.status;
            _this.changeDetector.markForCheck();
        });
        this.watchers.add(authWatcher);
    };
    ItemLinksComponent.prototype.ngOnChanges = function (changes) {
        // if (changes['linkOptions']) {
        //   // if (changes['linkOptions'].currentValue === 'opts') {
        //   //   this.svc.getOptionsList(changes['url'].currentValue).subscribe((list) => {
        //   //     this.optionList = list.result;
        //   //   })
        //   // }
        //
        if (this.restricted) {
            this.auth.getAuthStatus();
        }
        //
        // }
    };
    ItemLinksComponent.prototype.ngOnDestroy = function () {
        this.watchers.unsubscribe();
        //  this.route = null;
        this.changeDetector.detach();
        // this.changeDetector = null;
        // this.document = null;
        this.auth = null;
        // this.store = null;
        this.svc = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ItemLinksComponent.prototype, "restricted", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemLinksComponent.prototype, "linkOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ItemLinksComponent.prototype, "optionList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemLinksComponent.prototype, "assetType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemLinksComponent.prototype, "searchOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemLinksComponent.prototype, "url", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemLinksComponent.prototype, "searchUrl", void 0);
    ItemLinksComponent = __decorate([
        Component({
            selector: 'app-item-links',
            templateUrl: './item-links.component.html',
            styleUrls: ['./item-links.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(5, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [SearchService,
            ActivatedRoute,
            AuthCheckService,
            ChangeDetectorRef,
            Store, Object])
    ], ItemLinksComponent);
    return ItemLinksComponent;
}());
export { ItemLinksComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-links/item-links.component.js.map