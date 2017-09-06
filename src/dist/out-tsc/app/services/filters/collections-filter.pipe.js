var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CollectionsFilterPipe = (function () {
    function CollectionsFilterPipe() {
    }
    CollectionsFilterPipe.prototype.ngOnDestroy = function () {
        this.collections = null;
    };
    CollectionsFilterPipe.prototype.transform = function (input, value) {
        this.collections = input;
        if (!this.collections)
            return [];
        var query = value ? value : '.*';
        var regex = new RegExp(query, 'i');
        return this.collections.filter(function (it) { return regex.test(it.title); });
    };
    CollectionsFilterPipe = __decorate([
        Pipe({
            name: 'collectionsFilter'
        })
    ], CollectionsFilterPipe);
    return CollectionsFilterPipe;
}());
export { CollectionsFilterPipe };
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/filters/collections-filter.pipe.js.map