var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
var UtilitiesService = (function () {
    function UtilitiesService() {
    }
    UtilitiesService.prototype._handleAreaBackLink = function (selectedArea, selectedSubject) {
        if (selectedSubject && selectedSubject.id !== 0) {
            return '/' + environment.appRoot + '/collection/subject/' + selectedSubject.id + '/area/' + selectedArea;
        }
        return '/' + environment.appRoot + '/collection/area/' + selectedArea;
    };
    UtilitiesService.prototype._handleGlobalListBackLink = function (selectedSubject) {
        if (selectedSubject && selectedSubject.id !== 0) {
            return '/' + environment.appRoot + '/collection/subject/' + selectedSubject.id;
        }
        return '/' + environment.appRoot + '/collection';
    };
    UtilitiesService.prototype.getBackLink = function (selectedArea, selectedSubject) {
        if (selectedArea !== '0') {
            var path_1 = this._handleAreaBackLink(selectedArea, selectedSubject);
            return path_1;
        }
        var path = this._handleGlobalListBackLink(selectedSubject);
        return path;
    };
    UtilitiesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], UtilitiesService);
    return UtilitiesService;
}());
export { UtilitiesService };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/utilities.service.js.map