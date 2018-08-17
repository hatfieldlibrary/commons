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
import {ItemContainerComponent} from './item-container.component';
import {ItemComponent} from '../item/item.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import * as fromRoot from '../../../core/ngrx/reducers/index';
import {AppComponent} from '../../../app.component';
import {RelatedItemsComponent} from '../related-items/related-items.component';
import * as fromItem from '../../../core/ngrx/actions/item.actions';
import * as fromRelated from '../../../core/ngrx/actions/related.actions';
import {Renderer2} from '@angular/core';
import {BackSvgComponent} from '../../../shared/svg/back-svg/back-svg.component';
import {LockSvgComponent} from '../../../shared/svg/lock-svg/lock-svg.component';
import {CloseSvgComponent} from '../../../shared/svg/close-svg/close-svg.component';
import {ItemHeaderComponent} from '../item-header/item-header.component';
import {FooterComponent} from '../../../core/components/footer/footer.component';
import {ItemLinksComponent} from '../item-links/item-links.component';
import {SearchSvgComponent} from '../../../shared/svg/search-svg/search-svg.component';
import {MenuSvgComponent} from '../../../shared/svg/menu-svg/menu-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthCheckService} from '../../../core/services/auth-check.service';
import {SearchService} from '../../../core/services/search.service';
import {AppMenusComponent} from '../../../shared/apps-menu/app-menus.component';
import {HomeSvgComponent} from '../../../shared/svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../../../shared/svg/collections-svg/collections-svg.component';
import {ItemHeaderImageComponent} from '../item-header-image/item-header-image.component';
import {BackBlackSvgComponent} from '../../../shared/svg/back-black-svg/back-black-svg.component';
import {InfoSvgComponent} from '../../../shared/svg/info-svg/info-svg.component';
import {RunSvgComponent} from '../../../shared/svg/run-svg/run-svg.component';
import {ItemSelectComponent} from '../item-select-options/item-select.component';
import {HomeBlackSvgComponent} from '../../../shared/svg/home-black-svg/home-black-svg.component';
import {DatePickerSvgComponent} from '../../../shared/svg/date-picker-svg/date-picker-svg.component';
import {Subscription} from 'rxjs/Subscription';
import {MenuInteractionService} from '../../../core/services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../../core/services/timers/timeout.service';
import {HttpClientModule} from '@angular/common/http';
import {AreaOptionsComponent} from '../../browse/area-options/area-options.component';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {SetSelectedService} from '../../../core/services/set-selected.service';
import {LoggerService} from '../../../core/logger/logger.service';

const mockItem = {
  collection: {
    id: 1,
    title: '',
    image: '',
    url: '',
    searchUrl: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
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
  subjects: [{id: 1, name: 's1'}, {id: 2, name: 's2'}]

};

const mqAlias = 'xs';


const setMockAreaRoute = (route: any, mock: string) => {
  route.params = Observable.of({id: mock, areaId: 1});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setMockRoute = (route: any) => {
  route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

describe('ItemContainerComponent', () => {

  let component: ItemContainerComponent;
  let fixture: ComponentFixture<ItemContainerComponent>;
  let route;
  let store;
  let media;
  let watcher: Subscription;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ItemContainerComponent,
        ItemHeaderComponent,
        ItemHeaderImageComponent,
        RelatedItemsComponent,
        ItemComponent,
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent,
        MenuSvgComponent,
        CloseSvgComponent,
        BackSvgComponent,
        FooterComponent,
        AppMenusComponent,
        HomeSvgComponent,
        HomeBlackSvgComponent,
        BackBlackSvgComponent,
        DatePickerSvgComponent,
        ItemSelectComponent,
        InfoSvgComponent,
        RunSvgComponent,
        CollectionsSvgComponent,
        AreaOptionsComponent
      ],
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatGridListModule,
        MatCheckboxModule,
        MatChipsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTooltipModule,
        StoreModule.forRoot({}),
        RouterTestingModule
      ],
      providers: [
        LoggerService,
        SetTimeoutService,
        MenuInteractionService,
        SetSelectedService,
        NavigationServiceB,
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(mockItem);
            };
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: '0'})
          }
        },
        {
          provide: Renderer2,
          useValue: {
            setProperty: () => {
            }
          }
        },
        SearchService,
        AuthCheckService
      ]
    }).overrideComponent(AppMenusComponent, {
      set: {
        selector: 'app-menus-component',
        template: `<h6>Area Menu</h6>`
      }
    });
  }));

  beforeEach(async(() => {

    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(ItemContainerComponent);
    component = fixture.debugElement.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    media = fixture.debugElement.injector.get(ObservableMedia);

  }));

  beforeEach(() => {

    spyOn(route.params, 'subscribe').and.callThrough();
    spyOn(store, 'select').and.callThrough();
    //  spyOn(store, 'dispatch');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch request for item data', fakeAsync(() => {

    setMockAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemRequest('1'));

  }));

  it('should not dispatch request if id parameter is not supplied.', fakeAsync(() => {

    setMockRoute(route);
    component.ngOnInit();
    tick();
    expect(component.id).toBeUndefined();

  }));

  it('should dispatch request for related items.', fakeAsync(() => {

    setMockAreaRoute(route, '1');
    component.id = '1';
    spyOn(component, 'getRelatedItems').and.callThrough();
    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getItem);
    expect(component.getRelatedItems).toHaveBeenCalledWith(mockItem);
    expect(store.dispatch).toHaveBeenCalledWith(new fromRelated.ItemActionRelated('1', '1,2'));

  }));

  it('should clear related items on init', fakeAsync(() => {
    setMockAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new fromRelated.ClearRelatedItems());
  }));

  it('should reset the item reducer', fakeAsync(() => {
    setMockAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemReset());
  }));

  it('should remove listeners when component is destroyed', fakeAsync(() => {
    setMockAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    watcher = component.watchers;
    spyOn(watcher, 'unsubscribe');
    fixture.destroy();
    tick();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  }));


});
