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
import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import * as authActions from '../actions/auth.action';
import { environment } from '../environments/environment';
/**
 * This service solves the problem of how to track the current authentication status
 * in components.  If the current auth status is false, it check with the server to
 * determine if the session has been authenticated via CAS.  Sessions are set to expire
 * when the browser is closed, so there is no need to check the session status again after
 * we know that it is true.  If we add a logout feature, then we will need to call this
 * service every time the component is initialized.
 */
var AuthCheckService = (function () {
    function AuthCheckService(http, store) {
        this.http = http;
        this.store = store;
        this.authStatus = false;
    }
    /**
     * Update authentication status in the store.
     * @param status
     */
    AuthCheckService.prototype.setAuthStatus = function (status) {
        this.store.dispatch(new authActions.SetAuthStatus({ status: status }));
    };
    /**
     * Gets the current authentication status via server request if the local client
     * status is false.  Updates the store if the server request returns a true value.
     */
    AuthCheckService.prototype.getAuthStatus = function () {
        var _this = this;
        if (this.authStatus === false) {
            this.http.get(environment.authCheck)
                .map(function (res) { return res.json().auth; })
                .subscribe(function (status) {
                if (status === true) {
                    _this.authStatus = true;
                    _this.setAuthStatus(status);
                }
            });
        }
    };
    AuthCheckService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Store])
    ], AuthCheckService);
    return AuthCheckService;
}());
export { AuthCheckService };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/auth-check.service.js.map