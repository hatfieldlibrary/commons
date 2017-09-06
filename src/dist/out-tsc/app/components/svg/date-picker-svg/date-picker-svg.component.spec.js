import { async, TestBed } from '@angular/core/testing';
import { DatePickerSvgComponent } from './date-picker-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('DatePickerSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DatePickerSvgComponent],
            imports: [MdIconModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('date-picker', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_date_range_black_24px.svg'));
        fixture = TestBed.createComponent(DatePickerSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/date-picker-svg/date-picker-svg.component.spec.js.map