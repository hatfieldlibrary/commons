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

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AreaFiltersComponent} from './area-filters.component';
import {CloseSvgDisabledComponent} from '../../../shared/svg/close-svg-disabled/close-svg-disabled.component';
import {CloseWhiteSvgComponent} from '../../../shared/svg/close-white-svg/close-white-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/index';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {SimpleChange} from '@angular/core';
import {RemoveSelectedGroups, RemoveSelectedSubjects, RemoveSelectedTypes} from '../../../core/ngrx/actions/filter.actions';
import {FieldValues} from '../../../core/enum/field-names';

describe('AreaFiltersComponent', () => {
  let component: AreaFiltersComponent;
  let fixture: ComponentFixture<AreaFiltersComponent>;
  let store;
  const areaListMock = [
    {
      id: 1,
      name: 'areas one'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AreaFiltersComponent,
        CloseSvgDisabledComponent,
        CloseWhiteSvgComponent],
      imports: [
        MatChipsModule,
        MatIconModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            subscribe: () => {
              // jasmine.createSpy('subscribe').and.returnValue(new Subscription());
              return new Subscription();
            },
            isActive: () => {
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(areaListMock);
            };
          }
        },
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFiltersComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    component.groups = {
      groups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}],
      selectedGroups: [{id: 1, name: 'g1'}],
      previousGroups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}]
    };
    component.types = {
      types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
      selectedTypes: [{id: 1, name: 't1'}],
      previousTypes: [{id: 1, name: 't1'}, {id: 2, name: 't2'}]
    };
    component.subjects = {
      subjects: [{id: 1, name: 'ts'}, {id: 2, name: 't2'}],
      selectedSubjects: [{id: 1, name: 's1'}],
      previousSubjects: [{id: 1, name: 's1'}, {id: 2, name: 's2'}]
    };
    component.filters = {
      filterTerm: '',
      selectedSubjects: [{
        id: 0,
        name: ''
      }],
      selectedTypes: [{
        id: 0,
        name: ''
      }],
      selectedAreas: [{
        id: 0,
        name: ''
      }],
      selectedGroups: [{
        id: 0,
        name: ''
      }],
      removedAreas: [{
        id: 0,
        name: ''
      }],
      removedSubjects: [{
        id: 0,
        name: ''
      }],
      removedTypes: [{
        id: 0,
        name: ''
      }],
      removedGroups: [{
        id: 0,
        name: ''
      }]
    };

  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should update the store with removed groups.', fakeAsync(() => {
    component.filters.selectedGroups = [{id: 3, name: 'g3'}];
    component.groups.groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}];
    component.ngOnChanges({groups: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveSelectedGroups([{id: 3, name: 'g3'}]));
    expect(component.normalizedFilter).toEqual([{type: FieldValues.GROUP, id: 3, name: 'g3', active: false}])
  }));

  it('should update the store with removed types.', fakeAsync(() => {
    component.filters.selectedTypes = [{id: 3, name: 't3'}];
    component.types.types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}];
    component.ngOnChanges({types: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveSelectedTypes([{id: 3, name: 't3'}]));
    expect(component.normalizedFilter).toEqual([{type: FieldValues.TYPE, id: 3, name: 't3', active: false}])
  }));

  it('should update the store with removed subjects.', fakeAsync(() => {
    component.filters.selectedSubjects = [{id: 3, name: 's3'}];
    component.subjects.subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}];
    component.ngOnChanges({subjects: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveSelectedSubjects([{id: 3, name: 's3'}]));
    expect(component.normalizedFilter).toEqual([{type: FieldValues.SUBJECT, id: 3, name: 's3', active: false}])
  }));

  it('should add group to filter list', () => {
    component.filters.selectedTypes = [{id: 1, name: 'g1'}];
    component.types.types = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}];
    component.ngOnChanges({types: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.normalizedFilter).toEqual([{type: FieldValues.TYPE, id: 1, name: 'g1', active: true}])
  });

  it('should add type to filter list', () => {
    component.filters.selectedTypes = [{id: 1, name: 't1'}];
    component.types.types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}];
    component.ngOnChanges({types: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.normalizedFilter).toEqual([{type: FieldValues.TYPE, id: 1, name: 't1', active: true}])
  });

  it('should add subject to filter list', () => {
    component.filters.selectedTypes = [{id: 1, name: 's1'}];
    component.types.types = [{id: 1, name: 's1'}, {id: 2, name: 's2'}];
    component.ngOnChanges({types: new SimpleChange({}, {test: 'test'}, true)});
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.normalizedFilter).toEqual([{type: FieldValues.TYPE, id: 1, name: 's1', active: true}])
  });

  it('should unsubscribe watcher', () => {
    spyOn(component.watcher, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.watcher.unsubscribe).toHaveBeenCalled();
  })

});
