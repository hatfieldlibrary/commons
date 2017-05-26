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
import {ItemComponent} from "../../components/item/item.component";
import {
  MaterialModule, MdButtonModule, MdCardModule, MdChipsModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule,
  MdSelectModule,
  MdSidenavModule,
  MdToolbarModule
} from "@angular/material";
import {Action, Store, StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Observable} from "rxjs";
import * as fromRoot from '../../reducers';
import {AppComponent} from "../../components/app.component";
// import {MainContainer} from "../lists-container/main.container";
import {ListComponent} from "../../components/collection-list/list.component";
import {NavigationComponent} from "../../components/nav-selector/area.component";
import {SubjectsComponent} from "app/components/subject-selector/subjects.component";
import {ListHeaderComponent} from "../../components/image-header/image-header.component";
import {AreaInformationComponent} from "../../components/area-information/area-information.component";
import {RelatedItemsComponent} from "../../components/related-items/related-items.component";
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import * as fromItem from '../../actions/item.actions';
import {appRoutes} from '../../app.module';
import {select} from "@ngrx/core";
import {Injectable, Renderer2} from "@angular/core";
import {BackSvgComponent} from "../../components/svg/back-svg/back-svg.component";
import {LockSvgComponent} from "../../components/svg/lock-svg/lock-svg.component";
import {CloseSvgComponent} from "../../components/svg/close-svg/close-svg.component";
import {HomeScreenComponent} from "../../components/home-screen/home-screen.component";
import {ItemHeaderComponent} from "../../components/item-header/item-header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {ItemLinksComponent} from "../../components/item-links/item-links.component";
import {SearchSvgComponent} from "../../components/svg/search-svg/search-svg.component";
import {MenuSvgComponent} from "../../components/svg/menu-svg/menu-svg.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthCheckService} from "../../services/auth-check.service";
import {SearchService} from "../../services/search.service";
import {AppMenusComponent} from "../../components/apps-menu/app-menus.component";
import {HomeSvgComponent} from "../../components/svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../../components/svg/collections-svg/collections-svg.component";

// @Injectable()
// class MockActivatedRoute  {
//
//   params: Observable<any>;
//
// }


let mockItem = {
    collection: {
      id: 1,
      title: '',
      image: '',
      url: '',
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
    subjects: ['1', '2']

};
//
// @Injectable()
// class MockStore extends Store<any> {
//
//   select = () => {
//     return Observable.of(mockItem);
//   };
//
//   dispatch (action: Action)  {}
//
// }


const setMockAreaRoute = (route:any, mock: string) => {
  route.params = Observable.of({id: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setMockRoute = (route:any) => {
  route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

describe('ItemContainerComponent', () => {

  let component: ItemContainerComponent;
  let fixture: ComponentFixture<ItemContainerComponent>;
  let route;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ItemContainerComponent,
        ItemHeaderComponent,
        RelatedItemsComponent,
        NavigationComponent,
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
        CollectionsSvgComponent
      ],
      imports: [
        FlexLayoutModule,
        MdButtonModule,
        MdCardModule,
        MdListModule,
        MdToolbarModule,
        MdSidenavModule,
        MdInputModule,
        MdIconModule,
        MdSelectModule,
        MdGridListModule,
        MdChipsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MdInputModule,
        FormsModule,
        HttpModule,
        StoreModule.provideStore({}),
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(mockItem);
            };}
        },
        {
            provide: ActivatedRoute,
            useValue: {
              params: new Observable<any>(),
              url: {
                map: () =>  Observable.of('')
              }
            }

        },
        {
          provide: Renderer2,
          useValue: {
            setProperty: () => {}
          }
        },
        RouterModule,
        SearchService,
        AuthCheckService


      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {

    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(ItemContainerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);

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

  it('should not dispatch request for related items.', fakeAsync(() => {

    setMockAreaRoute(route, '1');
    component.id = '1';
    spyOn(component, 'getRelatedItems').and.callThrough();
    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getItem);
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ClearRelatedItems());
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemRequest('1'));
    expect(component.getRelatedItems).toHaveBeenCalledWith(mockItem);
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemActionRelated('1', '1,2'));

  }));

});
