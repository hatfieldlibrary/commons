import { async, TestBed } from '@angular/core/testing';
import { FilterSvgComponent } from './filter-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('FilterSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FilterSvgComponent],
            imports: [MdIconModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('filter-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_filter_list_black_24px.svg'));
        fixture = TestBed.createComponent(FilterSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/filter-svg/filter-svg.component.spec.js.map