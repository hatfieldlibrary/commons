var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
var InfoSvgComponent = (function () {
    function InfoSvgComponent(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_info_outline_black_24px.svg'));
    }
    InfoSvgComponent = __decorate([
        Component({
            selector: 'app-info-svg',
            templateUrl: './info-svg.component.html',
            styleUrls: ['./info-svg.component.css']
        }),
        __metadata("design:paramtypes", [MdIconRegistry, DomSanitizer])
    ], InfoSvgComponent);
    return InfoSvgComponent;
}());
export { InfoSvgComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/info-svg/info-svg.component.js.map