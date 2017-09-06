import { async, TestBed } from '@angular/core/testing';
import { KeyboardArrowBackSvgComponent } from './keyboard-arrow-back-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('KeyboardArrowBackSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [KeyboardArrowBackSvgComponent],
            imports: [MdIconModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('keyboard-back', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_left_black_48px.svg'));
        fixture = TestBed.createComponent(KeyboardArrowBackSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component.spec.js.map