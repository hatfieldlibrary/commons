/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store} from '@ngrx/store';
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
import {ImageHeaderComponent} from '../../components/image-header/image-header.component';
import {AreaInformationComponent} from '../../components/area-information/area-information.component';
import {AppComponent} from '../../components/app.component';
import {PageNotFoundComponent} from '../../shared/components/page-not-found/page-not-found.component';
import {ItemContainerComponent} from "../item-container/item-container.component";
import {ItemComponent} from "../../components/item/item.component";
import {appRoutes} from '../../app.module';
import {RelatedItemsComponent} from "../../components/related-items/related-items.component";

let areaSubscriptionMock =
  [{
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

  }];

let areaListMock = [
    {
      id: 1,
      title: 'area one',
      count: 1
    }
];

let areaList = areaListMock;

let areasMock = areaSubscriptionMock;

class MockActivatedRoute extends ActivatedRoute {

  params: Observable<any>;

  setParamMock(mockRoute: any) {
    if (mockRoute) {
      this.params = Observable.of(mockRoute);
    } else {
      this.params = Observable.of({});
    }
  }
}

class MockStore {

  select = () => {
    return Observable.of(areasMock);
  };
  dispatch = jasmine.createSpy('dispatch');

}

const setAllRoute = (route: MockActivatedRoute, mock: string) => {
 route.setParamMock({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setAreaRoute = (route: MockActivatedRoute, mock: string) => {
  route.setParamMock({areaId: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectRoute = (route: MockActivatedRoute, area: string, subject: string) => {
  route.setParamMock({areaId: area, subjectId: subject});
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

    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(MainContainer);
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    component = fixture.componentInstance;
    spyOn(store, 'select').and.callThrough();
    spyOn(component, 'getAllCollectionsForSubject').and.callThrough();
    spyOn(component, 'initializeAreas').and.callThrough();
    spyOn(component, 'getAreaInformation').and.callThrough();
    spyOn(component, 'getCollectionsByArea').and.callThrough();
    spyOn(component, 'getCollectionsBySubject').and.callThrough();

    spyOn(component, 'setAreasAvailable').and.callThrough();
    spyOn(component, 'getAllCollections').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should do nothing if no area id is provided in route parameters.', fakeAsync(() => {

    route.setParamMock(null);
    spyOn(route.params, 'subscribe').and.callThrough();
    areasMock = [];

    component.ngOnInit();
    tick();
    expect(store.dispatch).not.toHaveBeenCalled();

  }));

  it('should not update area id if unchanged,', fakeAsync(() => {

    setAreaRoute(route, 'default');
    areasMock = areaSubscriptionMock;

    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(route.params.subscribe).toHaveBeenCalled();
    tick();
    // If areaList store has elements, areasAvailable should be true after ngOnInit.
    expect(component.areasAvailable).toBeTruthy();
    expect(component.initializeAreas).not.toHaveBeenCalled();
    // If areasAvailable is truthy, dispatch should NOT be called.
    expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));

  }));

  it('should dispatch request for all collections if area id is zero.', fakeAsync(() => {

    setAreaRoute(route, '0');
    areasMock = areaSubscriptionMock;

    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(route.params.subscribe).toHaveBeenCalled();
    tick();
    expect(component.getAllCollections).toHaveBeenCalled();

  }));

  it('should use the existing area list from the store.', fakeAsync(() => {

    setAreaRoute(route, '1');
    areasMock = areaSubscriptionMock;

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

  it('should dispatch request to fetch the area list via service', fakeAsync(() => {

    setAreaRoute(route, '1');
    // Set areaList store mock to empty array.
    areaList = [
      {
        id: 0,
        title: '',
        count: 0
      }
    ];

    expect(component.areasAvailable).toBeFalsy();
    component.ngOnInit();
    expect(route.params.subscribe).toHaveBeenCalled();
    expect(component.setAreasAvailable).toHaveBeenCalled();
    // If areaList store is empty, areasAvailable should still be false after ngOnInit.
    expect(component.areasAvailable).toBeFalsy();
    // areasAvailable is false, dispatch should have been called.
    expect(component.initializeAreas).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaAction('1'));

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

  it('should dispatch request for collections by subject', fakeAsync(() => {
    setSubjectRoute(route, '1', '2');
    areasMock = areaSubscriptionMock;
    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionSubjectAction('2', '1'));

  }));

  it('should return all collections.', fakeAsync(() => {
    setAllRoute(route, '');
  //  areasMock = areaSubscriptionMock;
    component.ngOnInit();
    tick();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
    expect(store.dispatch).toHaveBeenCalledWith(new listActions.AllCollectionsAction());
    expect(store.dispatch).not.toHaveBeenCalledWith();

  }));

});
