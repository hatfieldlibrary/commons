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
import {MaterialModule} from "@angular/material";
import {Action, Store, StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import * as fromRoot from '../../reducers';
import {AppComponent} from "../../components/app.component";
import {MainContainer} from "../main-container/main.container";
import {ListComponent} from "../../components/collection-list/list.component";
import {AreaComponent} from "../../components/area-selector/area.component";
import {SubjectsComponent} from "app/components/subject-selector/subjects.component";
import {ImageHeaderComponent} from "../../components/image-header/image-header.component";
import {AreaInformationComponent} from "../../components/area-information/area-information.component";
import {RelatedItemsComponent} from "../../components/related-items/related-items.component";
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import * as fromItem from '../../actions/item.actions';
import {appRoutes} from '../../app.module';
import {select} from "@ngrx/core";

class MockActivatedRoute extends ActivatedRoute {

  params: Observable<any>;

}

const setMockAreaRoute = (route: MockActivatedRoute, mock: string) => {
  route.params = Observable.of({id: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setMockRoute = (route: MockActivatedRoute) => {
  route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

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

class MockStore extends Store<any> {

  select = () => {
    return Observable.of(mockItem);
  };

  dispatch (action: Action)  {}

}

describe('ItemContainerComponent', () => {
  let component: ItemContainerComponent;
  let fixture: ComponentFixture<ItemContainerComponent>;
  let route: MockActivatedRoute;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainContainer,
        ListComponent,
        AreaComponent,
        SubjectsComponent,
        ImageHeaderComponent,
        AreaInformationComponent,
        PageNotFoundComponent,
        ItemContainerComponent,
        ItemComponent,
        RelatedItemsComponent
      ],
      imports: [
        MaterialModule,
        StoreModule.provideStore({}),
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [
        {
          provide: Store,
          useClass: MockStore
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(ItemContainerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch request for item data', fakeAsync(() => {

    setMockRoute(route);
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemRequest('1'));

  }));

  it('should not dispatch request if id parameter is not supplied.', fakeAsync(() => {

    setMockAreaRoute(route, '1');
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
