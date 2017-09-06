import { async, TestBed } from '@angular/core/testing';
import { LockSvgComponent } from './lock-svg.component';
import { DomSanitizer } from "@angular/platform-browser";
import { MdIconModule, MdIconRegistry } from "@angular/material";
describe('LockSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LockSvgComponent],
            imports: [
                MdIconModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('lock', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_https_black_24px.svg'));
        fixture = TestBed.createComponent(LockSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/lock-svg/lock-svg.component.spec.js.map