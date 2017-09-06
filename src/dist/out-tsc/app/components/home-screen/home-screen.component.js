var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ChangeDetectionStrategy, Component } from '@angular/core';
var HomeScreenComponent = (function () {
    function HomeScreenComponent() {
    }
    HomeScreenComponent = __decorate([
        Component({
            selector: 'app-home-screen',
            templateUrl: './home-screen.component.html',
            styleUrls: ['./home-screen.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HomeScreenComponent);
    return HomeScreenComponent;
}());
export { HomeScreenComponent };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/home-screen/home-screen.component.js.map