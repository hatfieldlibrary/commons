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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AreaOptionsComponent} from './area-options.component';
import {MatListModule, MatTabsModule} from '@angular/material';
import {FilterUpdateServiceB} from '../../../core/services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../../core/services/observable/scroll-ready.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {APP_BASE_HREF} from '@angular/common';
import {MediaObserver} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs';


describe('AreaOptionsComponent', () => {
  let component: AreaOptionsComponent;
  let fixture: ComponentFixture<AreaOptionsComponent>;
  let readyService;
  let filterService;
  const filterMock = {areas: [{id: 1, name: ''}], selectedAreas: [{id: 1, name: ''}]};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaOptionsComponent],
      imports: [MatListModule, MatTabsModule, RouterTestingModule.withRoutes([])],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectSingleAreaStore = jasmine.createSpy('updateSelectSingleAreaStore').and.returnValue([{id: 1, name: ''}]);
        }
      },
        {
          provide: ScrollReadyService,
          useClass: class {
            setPosition = jasmine.createSpy('setPosition');
          }
        },
        {
          provide: NavigationServiceB,
          useClass: class {
            getAreaLink = jasmine.createSpy('getAreaLink');
          }
        },
        {
          provide: MediaObserver,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            media$: {
              subscribe: () => {
                return new Subscription();
              }
            },
            isActive: () => {
            }
          }
        }
        ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOptionsComponent);
    component = fixture.componentInstance;
    component.filter = filterMock;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.areaNavigation, 'emit');
//    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onAreaListControlChanged(1);
    expect(component.areaNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectSingleAreaStore).toHaveBeenCalledWith(filterMock.areas, 1)

  });
});
