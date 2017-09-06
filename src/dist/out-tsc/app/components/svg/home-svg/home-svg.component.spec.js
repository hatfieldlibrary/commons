import { async, TestBed } from '@angular/core/testing';
import { HomeSvgComponent } from './home-svg.component';
import { DomSanitizer } from "@angular/platform-browser";
import { MdIconModule, MdIconRegistry } from "@angular/material";
describe('HomeSvgComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [HomeSvgComponent],
            imports: [
                MdIconModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        var iconRegistry = TestBed.get(MdIconRegistry);
        var sanitizer = TestBed.get(DomSanitizer);
        iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg'));
        fixture = TestBed.createComponent(HomeSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/svg/home-svg/home-svg.component.spec.js.map