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
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
var CloseWhiteSvgComponent = (function () {
    function CloseWhiteSvgComponent(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('close-white', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_close_white_16px.svg'));
    }
    CloseWhiteSvgComponent = __decorate([
        Component({
            selector: 'app-icon-close-white',
            templateUrl: './close-white-svg.component.html',
            viewProviders: [MdIconRegistry]
        }),
        __metadata("design:paramtypes", [MdIconRegistry, DomSanitizer])
    ], CloseWhiteSvgComponent);
    return CloseWhiteSvgComponent;
}());
export { CloseWhiteSvgComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/close-white-svg/close-white-svg.component.js.map