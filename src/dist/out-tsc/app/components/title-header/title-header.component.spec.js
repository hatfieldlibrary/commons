import { async, TestBed } from '@angular/core/testing';
import { TitleHeaderComponent } from './title-header.component';
import { SubjectsComponent } from "../subject-selector/subjects.component";
import { KeyboardArrowBackSvgComponent } from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import { KeyboardArrowForwardSvgComponent } from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import { RouterTestingModule } from "@angular/router/testing";
import { MdButtonModule, MdIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Store, StoreModule } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
describe('TitleHeaderComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                TitleHeaderComponent,
                SubjectsComponent,
                KeyboardArrowBackSvgComponent,
                KeyboardArrowForwardSvgComponent,
            ],
            imports: [
                MdButtonModule,
                MdIconModule,
                RouterTestingModule,
                FlexLayoutModule,
                StoreModule
            ],
            providers: [
                // {
                //   provide: FlexLayoutModule,
                //   useClass: class {
                //     subscribe = () => {
                //       // return Observable.of('')
                //     }
                //   }
                // },
                //  ChangeDetectorRef,
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.select = function () {
                                return Observable.of('');
                            };
                        }
                        return class_1;
                    }())
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TitleHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/title-header/title-header.component.spec.js.map