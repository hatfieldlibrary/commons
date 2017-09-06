import { async, TestBed } from '@angular/core/testing';
import { RunSvgComponent } from './run-svg.component';
import { MdIconModule, MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
describe('RunSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RunSvgComponent],
            imports: [MdIconModule],
            providers: []
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('run', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_directions_run_black_24px.svg'));
        fixture = TestBed.createComponent(RunSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/run-svg/run-svg.component.spec.js.map