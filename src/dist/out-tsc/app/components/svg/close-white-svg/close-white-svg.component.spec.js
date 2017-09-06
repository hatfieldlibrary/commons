import { async, TestBed } from '@angular/core/testing';
import { CloseWhiteSvgComponent } from './close-white-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('CloseWhiteSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CloseWhiteSvgComponent],
            imports: [MdIconModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('back-black', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_close_white_16px.svg'));
        fixture = TestBed.createComponent(CloseWhiteSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/close-white-svg/close-white-svg.component.spec.js.map