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
import { ItemSelectComponent } from './item-select.component';
import { DatePickerSvgComponent } from "../svg/date-picker-svg/date-picker-svg.component";
import { MdIconModule, MdSelectModule } from "@angular/material";
import { SearchService } from "../../services/search.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
describe('ItemSelectComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                ItemSelectComponent,
                DatePickerSvgComponent
            ],
            imports: [
                MdSelectModule,
                MdIconModule,
                BrowserAnimationsModule
            ],
            providers: [
                SearchService
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ItemSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/item-select-options/item-select.component.spec.js.map