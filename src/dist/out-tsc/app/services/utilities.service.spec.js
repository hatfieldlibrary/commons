import { TestBed, inject } from '@angular/core/testing';
import { UtilitiesService } from './utilities.service';
describe('UtilitiesService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UtilitiesService]
        });
    });
    it('should be created', inject([UtilitiesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/utilities.service.spec.js.map