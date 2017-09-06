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
import { SubjectsComponent } from './subjects.component';
import { MdButtonModule, MdIconModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { KeyboardArrowForwardSvgComponent } from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import { KeyboardArrowBackSvgComponent } from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Store } from "@ngrx/store";
describe('SubjectsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                SubjectsComponent,
                KeyboardArrowBackSvgComponent,
                KeyboardArrowForwardSvgComponent
            ],
            imports: [
                MdButtonModule,
                RouterTestingModule,
                MdIconModule,
                // needed to test ObservableMedia
                FlexLayoutModule
            ],
            providers: [
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                        }
                        return class_1;
                    }())
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SubjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/subject-selector/subjects.component.spec.js.map