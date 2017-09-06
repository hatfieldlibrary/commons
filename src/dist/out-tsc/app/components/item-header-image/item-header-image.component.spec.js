import { async, TestBed } from '@angular/core/testing';
import { ItemHeaderImageComponent } from './item-header-image.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
describe('ItemHeaderImageComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ItemHeaderImageComponent],
            imports: [FlexLayoutModule, BrowserAnimationsModule],
            providers: [
                DomSanitizer,
                // needed to test ObservableMedia
                FlexLayoutModule
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ItemHeaderImageComponent);
        component = fixture.componentInstance;
        component.currentImage = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-header-image/item-header-image.component.spec.js.map