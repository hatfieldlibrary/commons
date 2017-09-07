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
import {SubjectsComponent} from './subjects.component';
import {MdButtonModule, MdIconModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {KeyboardArrowForwardSvgComponent} from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import {KeyboardArrowBackSvgComponent} from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {ElementRef} from "@angular/core";


describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let store;

  beforeEach(async(() => {
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
          useClass: class {
            dispatch = jasmine.createSpy('dispatch')
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'showSubjectNavigationArrow');

    store = fixture.debugElement.injector.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset subject list in store', () => {
    component.resetList();
    expect(store.dispatch).toHaveBeenCalled();
  });

});
