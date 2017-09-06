import { async, TestBed } from '@angular/core/testing';
import { InfoSvgComponent } from './info-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('InfoSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [InfoSvgComponent],
            imports: [MdIconModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_info_outline_black_24px.svg'));
        fixture = TestBed.createComponent(InfoSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/info-svg/info-svg.component.spec.js.map