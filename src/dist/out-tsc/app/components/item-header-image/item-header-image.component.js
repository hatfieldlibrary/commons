var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, HostBinding, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { imageFadeIn } from '../../animation/animations';
import { ObservableMedia } from '@angular/flex-layout';
var ItemHeaderImageComponent = (function () {
    function ItemHeaderImageComponent(sanitizer, media) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.media = media;
        this.currentImage = '';
        this.imageLoaded = false;
        this.isMobile = false;
        // Use host binding for animation.
        this.routeAnimation = true;
        this.display = 'block';
        this.position = 'absolute';
        this.width = '100%';
        this.image = '';
        this.watcher = this.media.subscribe(function (change) {
            if (change.mqAlias === 'xs') {
                _this.isMobile = true;
            }
            else {
                _this.isMobile = false;
            }
        });
    }
    ItemHeaderImageComponent.prototype.ngOnInit = function () {
        this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl('');
        this.imageLoaded = false;
        this.currentImage = '';
        this.setImage();
    };
    ItemHeaderImageComponent.prototype.ngDoCheck = function () {
        this.setImage();
    };
    ItemHeaderImageComponent.prototype.setImageLoaded = function () {
        this.imageLoaded = true;
    };
    ItemHeaderImageComponent.prototype.setImage = function () {
        if (this.image !== this.currentImage) {
            var url = void 0;
            if (this.isMobile) {
                url = environment.apiHost + environment.imagePath + '/resources/img/thumb/' + this.image;
            }
            else {
                url = environment.apiHost + environment.imagePath + '/resources/img/full/' + this.image;
            }
            var backgroundImage = this.sanitizer.sanitize(SecurityContext.URL, url).toString();
            this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundImage);
        }
        this.currentImage = this.image;
    };
    /**
     * Unsubscribe media watcher.
     */
    ItemHeaderImageComponent.prototype.ngOnDestroy = function () {
        if (this.watcher) {
            this.watcher.unsubscribe();
        }
        // this.media = null;
        this.sanitizer = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ItemHeaderImageComponent.prototype, "image", void 0);
    __decorate([
        HostBinding('@imageShow'),
        __metadata("design:type", Object)
    ], ItemHeaderImageComponent.prototype, "routeAnimation", void 0);
    __decorate([
        HostBinding('style.display'),
        __metadata("design:type", Object)
    ], ItemHeaderImageComponent.prototype, "display", void 0);
    __decorate([
        HostBinding('style.position'),
        __metadata("design:type", Object)
    ], ItemHeaderImageComponent.prototype, "position", void 0);
    __decorate([
        HostBinding('style.position'),
        __metadata("design:type", Object)
    ], ItemHeaderImageComponent.prototype, "width", void 0);
    ItemHeaderImageComponent = __decorate([
        Component({
            selector: 'app-item-header-image',
            templateUrl: './item-header-image.component.html',
            styleUrls: ['./item-header-image.component.css'],
            animations: [imageFadeIn],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [DomSanitizer,
            ObservableMedia])
    ], ItemHeaderImageComponent);
    return ItemHeaderImageComponent;
}());
export { ItemHeaderImageComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-header-image/item-header-image.component.js.map