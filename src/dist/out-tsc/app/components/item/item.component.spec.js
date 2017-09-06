/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { async, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { MdButtonModule, MdGridListModule, MdInputModule, MdListModule, MdSelectModule } from "@angular/material";
import { LockSvgComponent } from "../svg/lock-svg/lock-svg.component";
import { SearchSvgComponent } from "../svg/search-svg/search-svg.component";
import { FormsModule } from "@angular/forms";
import { MenuSvgComponent } from "../svg/menu-svg/menu-svg.component";
import { ItemLinksComponent } from "../item-links/item-links.component";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SearchService } from "../../services/search.service";
import { AuthCheckService } from "../../services/auth-check.service";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { BackBlackSvgComponent } from "../svg/back-black-svg/back-black-svg.component";
import { InfoSvgComponent } from "../svg/info-svg/info-svg.component";
import { RunSvgComponent } from "../svg/run-svg/run-svg.component";
import { ItemSelectComponent } from "../item-select-options/item-select.component";
import { DatePickerSvgComponent } from "../svg/date-picker-svg/date-picker-svg.component";
import { UtilitiesService } from "../../services/utilities.service";
import { FlexLayoutModule } from "@angular/flex-layout";
describe('ItemComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                ItemComponent,
                ItemLinksComponent,
                ItemSelectComponent,
                LockSvgComponent,
                SearchSvgComponent,
                BackBlackSvgComponent,
                DatePickerSvgComponent,
                RunSvgComponent,
                InfoSvgComponent,
                MenuSvgComponent
            ],
            imports: [
                MdListModule,
                MdButtonModule,
                MdInputModule,
                MdSelectModule,
                MdGridListModule,
                FormsModule,
                RouterTestingModule,
                // needed to test ObservableMedia
                FlexLayoutModule
            ],
            providers: [
                SearchService,
                AuthCheckService,
                UtilitiesService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.from([{ 'id': 1 }]),
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
                                return Observable.of('');
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
        fixture = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item/item.component.spec.js.map