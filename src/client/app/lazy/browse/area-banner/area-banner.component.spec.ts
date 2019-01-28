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

import {AreaBannerComponent} from './area-banner.component';
import {AreaFiltersComponent} from '../area-filters/area-filters.component';
import {CloseSvgDisabledComponent} from '../../../shared/svg/close-svg-disabled/close-svg-disabled.component';
import {CloseSvgComponent} from '../../../shared/svg/close-svg/close-svg.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CloseWhiteSvgComponent} from '../../../shared/svg/close-white-svg/close-white-svg.component';
import {FlexLayoutModule, MediaObserver} from '@angular/flex-layout';
import {Store, StoreModule} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/index';
import {JsonLdComponent} from '../../../shared/json-ld/json-ld.component';

describe('AreaBannerComponent', () => {
  let component: AreaBannerComponent;
  let fixture: ComponentFixture<AreaBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JsonLdComponent,
        AreaBannerComponent,
        AreaFiltersComponent,
        CloseSvgDisabledComponent,
        CloseSvgComponent,
        CloseWhiteSvgComponent],
      imports: [
        MatChipsModule,
        MatIconModule,
        StoreModule.forRoot({}),
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: MediaObserver,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            },
            media$: {
              subscribe: () => {
                return new Subscription();
              }
            }
          }
        }
      ]
    }).overrideComponent(AreaFiltersComponent, {
      set: {
        selector: 'app-area-filters',
        template: `<h6>Area Filters</h6>`
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaBannerComponent);
    component = fixture.componentInstance;

    component.areas = {
      areas: [{id: 1, name: 'a1'}, {id: 2, name: 'a2'}],
      selectedAreas: [{id: 1, name: 'a1'}]
    };
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
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
  it('should return true for area selected', () => {
    component.isSelected(1);
  });
  it('should return false for area selected', () => {
    component.isSelected(5);
  });

});
