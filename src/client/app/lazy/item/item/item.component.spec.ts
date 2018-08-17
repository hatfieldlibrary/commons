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

import {ItemComponent} from './item.component';
import {
  MatButtonModule, MatCardModule, MatCardSubtitle,
  MatCardTitle,
  MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import {LockSvgComponent} from '../../../shared/svg/lock-svg/lock-svg.component';
import {SearchSvgComponent} from '../../../shared/svg/search-svg/search-svg.component';
import {FormsModule} from '@angular/forms';
import {MenuSvgComponent} from '../../../shared/svg/menu-svg/menu-svg.component';
import {ItemLinksComponent} from '../item-links/item-links.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SearchService} from '../../../core/services/search.service';
import {AuthCheckService} from '../../../core/services/auth-check.service';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {BackBlackSvgComponent} from '../../../shared/svg/back-black-svg/back-black-svg.component';
import {InfoSvgComponent} from '../../../shared/svg/info-svg/info-svg.component';
import {RunSvgComponent} from '../../../shared/svg/run-svg/run-svg.component';
import {ItemSelectComponent} from '../item-select-options/item-select.component';
import {DatePickerSvgComponent} from '../../../shared/svg/date-picker-svg/date-picker-svg.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';

const mockItem = {
  collection: {
    id: 1,
    title: '',
    image: '',
    url: 'collegian',
    searchUrl: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: 'opts',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
  },
  category: {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  },
  itemTypes: [{
    id: 0,
    name: '',
    icon: ''

  }],
  subjects: [1, 2]

};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let searchSvc;
  let utilSvc;
  let watcher;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemComponent,
        ItemLinksComponent,
        ItemSelectComponent,
        LockSvgComponent,
        SearchSvgComponent,
        BackBlackSvgComponent,
        DatePickerSvgComponent,
        RunSvgComponent,
        InfoSvgComponent,
        MenuSvgComponent
      ],
      imports: [
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        FormsModule,
        RouterTestingModule,
        MatIconModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: SearchService,
          useClass: class {
            getOptionsList = () => {
              return Observable.of([]);
            };
          }
        },
        {
          provide: AuthCheckService,
          useClass: AuthCheckService
        },
        {provide: NavigationServiceB,
          useValue: {
            getBackLink: () => {
              return 'test link'
            },
            getIds: () => {}
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.from([{'id': 1}]),
            url: {
              map: () => Observable.of('')
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of('');
            };
          }
        },

      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    searchSvc = fixture.debugElement.injector.get(SearchService);
    utilSvc = fixture.debugElement.injector.get(NavigationServiceB);
    spyOn(searchSvc, 'getOptionsList').and.callThrough();
    spyOn(utilSvc, 'getBackLink').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get back link', () => {
    component.getBackLink();
    expect(utilSvc.getBackLink).toHaveBeenCalled();
    const path = component.getBackLink();
    expect(path).toEqual('test link');
  });


});
