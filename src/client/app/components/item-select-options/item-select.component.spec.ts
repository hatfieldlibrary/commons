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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemSelectComponent} from './item-select.component';
import {DatePickerSvgComponent} from "../svg/date-picker-svg/date-picker-svg.component";
import {MdIconModule, MdSelectModule} from "@angular/material";
import {SearchService} from "../../services/search.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DOCUMENT} from "@angular/common";
import {_document} from "@angular/platform-browser/src/browser";


describe('ItemSelectComponent', () => {
  let component: ItemSelectComponent;
  let fixture: ComponentFixture<ItemSelectComponent>;





    const documentMock: Document = <any>{ location: <any> { href: 'http://localhost' }};


  beforeEach(async(() => {
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
        {
          provide: DOCUMENT,
          useValue: documentMock
        },
        SearchService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get query link', () => {
    component.optionSearch('test');
    expect(component.href).toContain('test');
  })

});
