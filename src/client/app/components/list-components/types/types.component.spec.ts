/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../../services/filters-2/filter-update.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollReadyService} from '../../../services/observable/scroll-ready.service';


describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;
  let readyService;
  let filterService;

  const mockTypesFilter = {
    types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
    selectedTypes: [{id: 1, name: 't1'}]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent],
      imports: [MatListModule, BrowserAnimationsModule],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectedFields = jasmine.createSpy('updateSelectedFields').and.returnValue([{id: 1, name: ''}]);
        }
      },
        {
          provide: ScrollReadyService,
          useClass: class {
            setPosition = jasmine.createSpy('setPosition');
          }
        }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    component.filter = mockTypesFilter;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.typeNavigation, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onTypeListControlChanged(1);
    expect(component.typeNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectedFields)
      .toHaveBeenCalledWith(mockTypesFilter.selectedTypes, mockTypesFilter.types,  1, FieldTypeKey.TYPE);
  });

  it('should return true for selected field', () => {
    const selected = component.isSelected(1);
    expect(selected).toBeTruthy();
  });

  it('should return false for selected field', () => {
    const selected = component.isSelected(3);
    expect(selected).toBeFalsy();
  });

});
