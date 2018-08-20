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

import { ItemLinksComponent } from './item-links.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LockSvgComponent} from '../../../shared/svg/lock-svg/lock-svg.component';
import {SearchSvgComponent} from '../../../shared/svg/search-svg/search-svg.component';
import {SearchService} from '../../../core/services/search.service';
import {ActivatedRoute} from '@angular/router';
import {AuthCheckService} from '../../../core/services/auth-check.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ItemSelectComponent} from '../item-select-options/item-select.component';
import {DatePickerSvgComponent} from '../../../shared/svg/date-picker-svg/date-picker-svg.component';
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../../core/ngrx/reducers/index';

describe('ItemLinksComponent', () => {
  let component: ItemLinksComponent;
  let fixture: ComponentFixture<ItemLinksComponent>;
  let watcher: Subscription;
  let store;
  let auth;
  let route;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent,
        DatePickerSvgComponent,
        ItemSelectComponent
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        MatIconModule, HttpClientModule
      ],
      providers: [
        SearchService,
        {
          provide: AuthCheckService,
          useValue: {
            getAuthStatus: () => Observable.of({})
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Observable<any>(),
            parent: {
              url: {
                map: () =>  Observable.of('')
              }
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of({});
            };
          }
        },
      ]
    });
  }));

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLinksComponent);
    store = fixture.debugElement.injector.get(Store);
    auth = fixture.debugElement.injector.get(AuthCheckService);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(route.parent.url, 'map').and.callThrough();
    spyOn(store, 'select').and.callThrough();
    spyOn(auth, 'getAuthStatus').and.callThrough();
    component = fixture.componentInstance;
    watcher = component.watchers;
    spyOn(watcher, 'add');
  });

  it('should initialize the component', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(route.parent.url.map).toHaveBeenCalled();
    expect(component.watchers.add).toHaveBeenCalled();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAuthStatus);
    expect(auth.getAuthStatus).toHaveBeenCalled();
  }));

  it('should remove subscriptions on destroy', fakeAsync(() => {
    spyOn(watcher, 'unsubscribe');
    component.ngOnDestroy();
    tick();
    expect(component.watchers.unsubscribe).toHaveBeenCalled();

  }));
});
