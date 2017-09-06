import { async, TestBed } from '@angular/core/testing';
import { AreasSvgComponent } from './areas-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('AreasSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AreasSvgComponent],
            imports: [
                MdIconModule
            ],
            providers: []
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('areas', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_subject_white_24px.svg'));
        fixture = TestBed.createComponent(AreasSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/areas-svg/areas-svg.component.spec.js.map