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
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdCardModule, MdChipsModule, MdInputContainer, MdInputModule, MdListModule} from "@angular/material";
import {ListComponent} from './list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CloseWhiteSvgComponent} from "../svg/close-white-svg/close-white-svg.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CollectionsFilterPipe} from "../../services/filters/collections-filter.pipe";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {EventEmitter} from "@angular/core";


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let collections = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        CloseWhiteSvgComponent,
        CollectionsFilterPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MdCardModule,
        MdListModule,
        MdChipsModule,
        MdInputModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
          }
        },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
