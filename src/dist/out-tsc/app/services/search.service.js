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
import { environment } from "../environments/environment";
import { Http } from "@angular/http";
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
    }
    /*
      TODO This service is hard-coded to current cview queries. Needs to be somehow generalized!
     */
    /**
     * Opens option query target in a new window. The base url is provided here because Tagger currently accepts
     * only the collection name as parameter.  This allows us to look up the options list from the remote API
     * service. This is a known issue in Tagger.
     * @param collection the collection name
     * @param terms user provided search terms
     */
    SearchService.prototype.getOptionsQuery = function (collection, terms) {
        var query = encodeURIComponent(terms);
        var href = "http://libmedia.willamette.edu/cview/" + collection + ".html#!browse:search:" + collection + "/date^" + query + "^all^and!";
        return href;
    };
    /**
     * Opens simple search query target in a new window.
     * @param baseURL base url for the query
     * @param terms user provided search terms
     */
    SearchService.prototype.executeSimpleSearchQuery = function (baseURL, terms) {
        var query = encodeURIComponent(terms);
        var splitString = baseURL.split('{$query}');
        var href = splitString[0] + query + splitString[1];
        //const href = baseURL + `all^${query}^all^and!`;
        // const href = baseURL.template();
        return href;
    };
    SearchService.prototype.getOptionsList = function (collection) {
        return this.http.get(environment.apiHost + environment.apiRoot + '/options/external/' + collection)
            .map(function (res) { return res.json(); });
    };
    SearchService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/search.service.js.map