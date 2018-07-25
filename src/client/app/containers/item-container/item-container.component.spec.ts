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
import {ItemContainerComponent} from './item-container.component';
import {ItemComponent} from '../../components/item/item.component';
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
import * as fromRoot from '../../reducers';
import {AppComponent} from '../../components/app.component';
import {RelatedItemsComponent} from '../../components/related-items/related-items.component';
import * as fromItem from '../../actions/item.actions';
import * as fromRelated from '../../actions/related.actions';
import {Renderer2} from '@angular/core';
import {BackSvgComponent} from '../../components/svg/back-svg/back-svg.component';
import {LockSvgComponent} from '../../components/svg/lock-svg/lock-svg.component';
import {CloseSvgComponent} from '../../components/svg/close-svg/close-svg.component';
import {ItemHeaderComponent} from '../../components/item-header/item-header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {ItemLinksComponent} from '../../components/item-links/item-links.component';
import {SearchSvgComponent} from '../../components/svg/search-svg/search-svg.component';
import {MenuSvgComponent} from '../../components/svg/menu-svg/menu-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthCheckService} from '../../services/auth-check.service';
import {SearchService} from '../../services/search.service';
import {AppMenusComponent} from '../../components/apps-menu/app-menus.component';
import {HomeSvgComponent} from '../../components/svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../../components/svg/collections-svg/collections-svg.component';
import {ItemHeaderImageComponent} from '../../components/item-header-image/item-header-image.component';
import {BackBlackSvgComponent} from '../../components/svg/back-black-svg/back-black-svg.component';
import {InfoSvgComponent} from '../../components/svg/info-svg/info-svg.component';
import {RunSvgComponent} from '../../components/svg/run-svg/run-svg.component';
import {ItemSelectComponent} from '../../components/item-select-options/item-select.component';
import {HomeBlackSvgComponent} from '../../components/svg/home-black-svg/home-black-svg.component';
import {DatePickerSvgComponent} from '../../components/svg/date-picker-svg/date-picker-svg.component';
import {Subscription} from 'rxjs/Subscription';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../services/timers/timeout.service';
import {HttpClientModule} from '@angular/common/http';
import {AreaOptionsComponent} from '../../components/area-options/area-options.component';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {SetSelectedService} from '../../services/set-selected.service';
import {LoggerService} from '../../shared/logger/logger.service';

let mockItem = {
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
