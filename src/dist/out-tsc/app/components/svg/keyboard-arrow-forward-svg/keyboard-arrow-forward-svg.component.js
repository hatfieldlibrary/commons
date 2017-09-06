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
var KeyboardArrowForwardSvgComponent = (function () {
    function KeyboardArrowForwardSvgComponent(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('keyboard-forward', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_right_black_48px.svg'));
    }
    KeyboardArrowForwardSvgComponent = __decorate([
        Component({
            selector: 'app-keyboard-arrow-forward-svg',
            templateUrl: './keyboard-arrow-forward-svg.component.html',
            styleUrls: ['./keyboard-arrow-forward-svg.component.css']
        }),
        __metadata("design:paramtypes", [MdIconRegistry, DomSanitizer])
    ], KeyboardArrowForwardSvgComponent);
    return KeyboardArrowForwardSvgComponent;
}());
export { KeyboardArrowForwardSvgComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component.js.map