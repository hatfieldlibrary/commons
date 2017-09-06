import { async, TestBed } from '@angular/core/testing';
import { ItemLinksComponent } from './item-links.component';
import { MdButtonModule, MdInputModule, MdListModule, MdSelectModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { LockSvgComponent } from "../svg/lock-svg/lock-svg.component";
import { SearchSvgComponent } from "../svg/search-svg/search-svg.component";
import { SearchService } from "../../services/search.service";
import { ActivatedRoute } from "@angular/router";
import { AuthCheckService } from "../../services/auth-check.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ItemSelectComponent } from "../item-select-options/item-select.component";
import { DatePickerSvgComponent } from "../svg/date-picker-svg/date-picker-svg.component";
describe('ItemLinksComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                ItemLinksComponent,
                LockSvgComponent,
                SearchSvgComponent,
                DatePickerSvgComponent,
                ItemSelectComponent
            ],
            imports: [
                MdListModule,
                MdButtonModule,
                MdInputModule,
                MdSelectModule,
                FormsModule
            ],
            providers: [
                SearchService,
                AuthCheckService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: new Observable(),
                        url: {
                            map: function () { return Observable.of(''); }
                        }
                    }
                },
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                            this.select = function () {
                                return Observable.of({});
                            };
                        }
                        return class_1;
                    }())
                },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ItemLinksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-links/item-links.component.spec.js.map