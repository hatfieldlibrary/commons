import { async, TestBed } from '@angular/core/testing';
import { BackSvgComponent } from './back-svg.component';
import { DomSanitizer } from "@angular/platform-browser";
import { MdIconModule, MdIconRegistry } from "@angular/material";
describe('BackSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BackSvgComponent],
            imports: [
                MdIconModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_white_24px.svg'));
        fixture = TestBed.createComponent(BackSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/back-svg/back-svg.component.spec.js.map