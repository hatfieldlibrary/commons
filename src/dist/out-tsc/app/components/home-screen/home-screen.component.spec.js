import { async, TestBed } from '@angular/core/testing';
import { HomeScreenComponent } from './home-screen.component';
import { MdCardModule, MdChipsModule } from "@angular/material";
describe('HomeScreenComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [HomeScreenComponent],
            imports: [
                MdChipsModule,
                MdCardModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(HomeScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/home-screen/home-screen.component.spec.js.map