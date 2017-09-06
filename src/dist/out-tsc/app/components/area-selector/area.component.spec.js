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
/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdCheckboxModule, MdListModule } from '@angular/material';
import { NavigationComponent } from './area.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MenuSvgComponent } from "../svg/menu-svg/menu-svg.component";
import { BackSvgComponent } from "../svg/back-svg/back-svg.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
describe('NavigationComponent', function () {
    var component;
    var fixture;
    var areaList = [
        {
            id: 1,
            title: 'area one',
            count: 1
        }
    ];
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                NavigationComponent,
                BackSvgComponent,
                MenuSvgComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MdListModule,
                MdButtonModule,
                MdCheckboxModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                            this.select = function () {
                                return Observable.of(areaList);
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
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/area-selector/area.component.spec.js.map