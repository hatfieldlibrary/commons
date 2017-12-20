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
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MatButtonModule, MatCheckboxModule, MatListModule} from '@angular/material';
import { NavigationComponent } from './area.component';

import {RouterTestingModule} from "@angular/router/testing";
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store;
  let router;

  let areaList = [
    {
      id: 1,
      title: 'area one',
      count: 1
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        BackSvgComponent,
        MenuSvgComponent
       ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(areaList);
            };
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
    router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate');
   // component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create area form array', fakeAsync(() => {
  //   component.selectedAreas = '1,2';
  //   fixture.detectChanges();
  //   component.ngOnInit();
  //   expect(component.formArrayRef.length).toEqual(2);
  // }));

  // it('should add to the form array and navigate when checkbox is selected', fakeAsync(() => {
  //   // initialize with two selected areas.
  //  component.areaFormArray.push(new FormControl(1));
  //   // add new area and navigate.
  //   component.onChange('3', {checked: true});
  //   expect(store.dispatch).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalled();
  //   expect(component.areaFormArray.length).toEqual(2);

  //}));

  // it('should reset the form array and navigate when checkbox is selected', fakeAsync(() => {
  //   // initialize with two selected areas.
  //   component.areaFormArray.push(new FormControl(1));
  //   // add new area and navigate.
  //   component.onChange('0', {checked: true});
  //   expect(store.dispatch).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalled();
  //   expect(component.areaFormArray.length).toEqual(1);
  //
  // }));

  // it('should remove from the form array when checkbox in unselected', () => {
  //   // initialize with two selected areas.
  //   component.areaFormArray.push(new FormControl(1));
  //   component.areaFormArray.push(new FormControl(2));
  //   // add new area and navigate.
  //   component.onChange('1', {checked: false});
  //   expect(store.dispatch).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalled();
  //   expect(component.areaFormArray.length).toEqual(1);
  // });

 // it('should return true for area selected', () => {
  //  component.selectedAreas = '1';
    // expect(component.isSelected('1')).toBe(true);
 // });


//  it('should return false for area selected', () => {
//    component.selectedAreas = '1';
   // expect(component.isSelected('2')).toBe(false);
//  });
});
