import { TestBed, inject } from '@angular/core/testing';
import { AuthCheckService } from './auth-check.service';
import { HttpModule } from "@angular/http";
import { Store } from "@ngrx/store";
import { MockBackend } from "@angular/http/testing";
import { Observable } from "rxjs/Observable";
describe('AuthCheckService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpModule
            ],
            providers: [AuthCheckService,
                MockBackend,
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                            this.select = function () {
                                return Observable.of({});
                            };
                        }
                        return class_1;
                    }())
                }
            ]
        });
    });
    it('should ...', inject([AuthCheckService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/auth-check.service.spec.js.map