import { async, TestBed } from '@angular/core/testing';
import { CloseSvgComponent } from './close-svg.component';
import { DomSanitizer } from "@angular/platform-browser";
import { MdIconModule, MdIconRegistry } from "@angular/material";
describe('CloseSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CloseSvgComponent],
            imports: [
                MdIconModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
        fixture = TestBed.createComponent(CloseSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/close-svg/close-svg.component.spec.js.map