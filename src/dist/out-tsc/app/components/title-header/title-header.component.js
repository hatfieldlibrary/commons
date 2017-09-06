var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
var TitleHeaderComponent = (function () {
    function TitleHeaderComponent(media) {
        var _this = this;
        this.media = media;
        this.isMobile = true;
        this.watcher = this.media.subscribe(function (change) {
            if (change.mqAlias === 'xs') {
                _this.isMobile = true;
            }
            else {
                _this.isMobile = false;
            }
        });
    }
    TitleHeaderComponent.prototype.ngOnDestroy = function () {
        this.watcher.unsubscribe();
        //  this.media = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitleHeaderComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitleHeaderComponent.prototype, "subtitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitleHeaderComponent.prototype, "subjectList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitleHeaderComponent.prototype, "areaId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TitleHeaderComponent.prototype, "type", void 0);
    TitleHeaderComponent = __decorate([
        Component({
            selector: 'app-title-header',
            templateUrl: './title-header.component.html',
            styleUrls: ['./title-header.component.css']
        }),
        __metadata("design:paramtypes", [ObservableMedia])
    ], TitleHeaderComponent);
    return TitleHeaderComponent;
}());
export { TitleHeaderComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/title-header/title-header.component.js.map