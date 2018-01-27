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

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ItemComponent} from './item.component';
import {MatButtonModule, MatGridListModule, MatInputModule, MatListModule, MatSelectModule} from "@angular/material";
import {LockSvgComponent} from "../svg/lock-svg/lock-svg.component";
import {SearchSvgComponent} from "../svg/search-svg/search-svg.component";
import {FormsModule} from "@angular/forms";
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {ItemLinksComponent} from "../item-links/item-links.component";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchService} from "../../services/search.service";
import {AuthCheckService} from "../../services/auth-check.service";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {BackBlackSvgComponent} from "../svg/back-black-svg/back-black-svg.component";
import {InfoSvgComponent} from "../svg/info-svg/info-svg.component";
import {RunSvgComponent} from "../svg/run-svg/run-svg.component";
import {ItemSelectComponent} from "../item-select-options/item-select.component";
import {DatePickerSvgComponent} from "../svg/date-picker-svg/date-picker-svg.component";
import {UtilitiesService} from "../../services/utils/utilities.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SimpleChange} from "@angular/core";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

let mockItem = {
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
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        FormsModule,
        RouterTestingModule,
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
        AuthCheckService,
        {
          provide: UtilitiesService,
          useValue: {
            getBackLink: () => {
              return 'test link'
            }
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    searchSvc = fixture.debugElement.injector.get(SearchService);
    utilSvc = fixture.debugElement.injector.get(UtilitiesService);
    spyOn(searchSvc, 'getOptionsList').and.callThrough();
    spyOn(utilSvc, 'getBackLink').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get back link', () => {
    component.getBackLink();
    expect(utilSvc.getBackLink).toHaveBeenCalled();
    let path = component.getBackLink();
    expect(path).toEqual('test link');
  });


});
