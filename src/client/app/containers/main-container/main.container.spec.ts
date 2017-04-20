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

/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {MaterialModule} from '@angular/material';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import {MainContainer} from './main.container';
import {ListComponent} from '../../components/collection-list/list.component';
import {AreaComponent} from '../../components/area-selector/area.component';
import {SubjectsComponent} from '../../components/subject-selector/subjects.component';

import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectActions from '../../actions/subject-actions';
import {ImageHeaderComponent} from '../../components/image-header/image-header.component';
import {AreaInformationComponent} from '../../components/area-information/area-information.component';
import {AppComponent} from '../../components/app.component';
import {PageNotFoundComponent} from '../../shared/components/page-not-found/page-not-found.component';
import {ItemContainerComponent} from "../item-container/item-container.component";
import {ItemComponent} from "../../components/item/item.component";
import {appRoutes} from '../../app.module';
import {RelatedItemsComponent} from "../../components/related-items/related-items.component";

let areaSubscriptionMock =
  {
    id: 1,
    title: 'test',
    name: 'test subject',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 1,
    Tag: { // This added so test works with subjects template.
      id: '1',
      name: 'test tag'
    }

  };

let areaListMock = [
    {
      id: 1,
      title: 'area one',
      count: 1
    }
];

let areaList = areaListMock;

let areasMock = areaSubscriptionMock;

//
// const setParamMock = (mockRoute) => {
//   if (mockRoute) {
//     this.params = Observable.of(mockRoute);
//   } else {
//     this.params = Observable.of({});
//   }
// };

class MockActivatedRoute extends ActivatedRoute {

  params: Observable<any>;


}

class MockStore extends Store<any> {

  select = () => {
    return Observable.of(areaList);
  };
  dispatch (action: Action) {};

}

const setAllRoute = (route: MockActivatedRoute, mock: string) => {
 route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setAreaRoute = (route: MockActivatedRoute, mock: string) => {
  route.params = Observable.of({areaId: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectAreaRoute = (route: MockActivatedRoute, area: string, subject: string) => {
  route.params = Observable.of({areaId: area, subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectRoute = (route: MockActivatedRoute, subject: string) => {
  route.params = Observable.of({subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

describe('MainContainer', () => {
  let component: MainContainer;
  let fixture: ComponentFixture<MainContainer>;
  let store:MockStore;
  let route:MockActivatedRoute;

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
        RelatedItemsComponent,
        ItemComponent
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
     areaList = areaListMock;
    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(MainContainer);
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    component = fixture.componentInstance;
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch');
    spyOn(component, 'getAllCollectionsForSubject').and.callThrough();
    spyOn(component, 'initializeAreas').and.callThrough();
    spyOn(component, 'getAreaInformation').and.callThrough();
    spyOn(component, 'getCollectionsByArea').and.callThrough();
    spyOn(component, 'getCollectionsBySubject').and.callThrough();
    spyOn(component, 'getAllCollections').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should fetch all collections if no area id provided in route parameters.', fakeAsync(() => {

    //route.setParamMock(null);

    spyOn(route.params, 'subscribe').and.callThrough();

    component.ngOnInit();

    tick();

    expect(component.getAllCollections).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.AllCollectionsAction);
    expect(store.dispatch).toHaveBeenCalledWith(new subjectActions.AllSubjectAction());


  }));

  it('should not update area id if unchanged,', fakeAsync(() => {

    setAreaRoute(route, 'default');

    spyOn(component, 'setAreasAvailable').and.callThrough();

    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(route.params.subscribe).toHaveBeenCalled();
    tick();
    // If areaList store has elements, areasAvailable should be true after ngOnInit.
    expect(component.areasAvailable).toBeTruthy();
    // If areasAvailable is truthy, dispatch should NOT be called.
    expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));

  }));


  it('should use the existing area list from the store.', fakeAsync(() => {

    setAreaRoute(route, '1');
    areaListMock = areaList;
    spyOn(component, 'setAreasAvailable').and.callThrough();
    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(route.params.subscribe).toHaveBeenCalled();
    tick();
    // If areaList store has elements, areasAvailable should be true after ngOnInit.
    expect(component.areasAvailable).toBeTruthy();
    expect(component.initializeAreas).toHaveBeenCalled();
    // If areasAvailable is truthy, dispatch should NOT be called.
    expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));

  }));

  it('should dispatch request to fetch the area list', fakeAsync(() => {

    setAllRoute(route, '');
  //  Set areaList store mock to empty array. This should trigger request for area list.
    areaList = [
      {
        id: 0,
        title: '',
        count: 0
      }
    ];
    spyOn(component, 'setAreasAvailable').and.callThrough();

    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();

    expect(component.areasAvailable).toBeFalsy();
    expect(route.params.subscribe).toHaveBeenCalled();
    expect(component.setAreasAvailable).toHaveBeenCalled();
    // areasAvailable is false, dispatch should have been called.
    expect(component.initializeAreas).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaAction());

  }));

  it('should dispatch request for collections by area', fakeAsync(() => {
    setAreaRoute(route, '1');
    areasMock = areaSubscriptionMock;
    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionAction('1'));
    expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaInformation('1'));

  }));

  it('should dispatch request for collections by subject and area', fakeAsync(() => {
    setSubjectAreaRoute(route, '1', '2');

    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionSubjectAction('2', '1'));

  }));

  it('should dispatch request for collections by subject only', fakeAsync(() => {
    setSubjectRoute(route, '1');

    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.AllCollectionSubjectAction('1'));
    expect(store.dispatch).toHaveBeenCalledWith(new subjectActions.AllSubjectAction());

  }));

});
