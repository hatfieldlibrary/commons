/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, fakeAsync, tick, ComponentFixture, TestBed, inject, getTestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store} from "@ngrx/store";
import {MaterialModule} from "@angular/material";
import {Location} from "@angular/common";

import {appRoutes} from '../app.module'
import {MainContainer} from './main.container';
import {ListComponent} from "../components/collection-list/list.component";
import {AreaComponent} from "../components/area-selector/area.component";
import {SubjectsComponent} from "../components/subject-selector/subjects.component";

import * as fromRoot from '../reducers';
import * as listActions from "../actions/collection.actions";
import * as areaActions from "../actions/area.actions";
import * as subjectAction from "../actions/subject-actions";
import {ImageHeaderComponent} from "../components/image-header/image-header.component";
import {AreaInformationComponent} from "../components/area-information/area-information.component";
import {Subject, Observable, Observer} from "rxjs";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";
import {PageNotFoundComponent} from "../shared/components/page-not-found/page-not-found.component";

let areaList = [
  {
    id: 1,
    title: 'test',
    name: 'test subject',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 1,
    Tag: {
      id: '1',
      name: 'test tag'
    }

  }];

//let router;
let location;

class MockStore {
  select = () => {
  };
  dispatch = jasmine.createSpy('dispatch');
  // subscribe = jasmine.createSpy('subscribe')
}

describe('MainContainer', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store;

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
        PageNotFoundComponent
      ],
      imports: [
        MaterialModule,
        StoreModule.provideStore({}),
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [{
        provide: Store,
        useClass: MockStore
      },
        MainContainer
      ]
    })
      .compileComponents();

  }));


  beforeEach(() => {

    // let injector = getTestBed();
    // location = injector.get(Location);
    // router = injector.get(Router);
    fixture = TestBed.createComponent(AppComponent);
    //router.initialNavigation();
    //
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaList])
    });


  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();

  });

  it('should use existing area list from the store.', fakeAsync(inject([MainContainer, Router, Location], (component, router, location) => {

    spyOn(component, 'setAreasAvailable').and.callThrough();
    router.navigate(['list/collections/area/1']).then(() => {

      expect(component.areasAvailable).toBeFalsy();
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
      tick();

        expect(location.path()).toBe('/list/collections/area/1');

        expect(component.setAreasAvailable).toHaveBeenCalled();

        expect(component.areasAvailable).toBeTruthy();
        //  expect(component.getAreas).toHaveBeenCalled();
        // If areas exist this dispatch should NOT be called.
        expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));
        tick();
        expect(component.areaId).toEqual('1');
      });

  })));

  it('should fetch area list', fakeAsync(inject([MainContainer, Router, Location], (component, router, location) => {

    spyOn(component, 'getAreas').and.callThrough();
    spyOn(component, 'setAreasAvailable').and.callThrough();
    store.select.and.stub();
    // set to empty area array.
    store.select.and.callFake(() => {
      return Observable.from([])
    });

    router.navigate(['list/collections/area/1']).then(() => {
      tick();
      component.ngOnInit();
      // store = fixture.debugElement.injector.get(Store);
      tick();
      expect(location.path()).toBe('/list/collections/area/1');
      expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
      expect(component.setAreasAvailable).toHaveBeenCalled();
      tick();
      expect(component.areasAvailable).toBeFalsy();
      //  expect(component.getAreas).toHaveBeenCalled();
      // No areas exist in store, so we need to dispatch so the effect will trigger the service call for data.
      expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaAction('1'));
    });

  })));

  it('should dispatch request for collections by area', fakeAsync(inject([MainContainer, Router, Location], (component, router, location) => {


    spyOn(component, 'getCollectionsByArea').and.callThrough();
    spyOn(component, 'getAreaInformation').and.callThrough();

    router.navigate(['list/collections/area/1']).then(() => {
      tick();
      component.ngOnInit();
      // store = fixture.debugElement.injector.get(Store);
      tick();
      //   expect(location.path()).toBe('/list/collections/area/1');
      // expect(component.getCollectionsByArea).toHaveBeenCalled();
      // expect(component.getAreaInformation).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
      expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionAction('1'));
      expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaInformationUpdate('1'));

    });

  })));

  it('should dispatch request for collections by subject', fakeAsync(inject([MainContainer, Router, Location], (component, router, location) => {


    spyOn(component, 'getCollectionsByArea');
    spyOn(component, 'getCollectionsBySubject').and.callThrough();

    router.navigate(['list/collections/subject/2/area/1']).then(() => {
      tick();
      component.ngOnInit();
      //store = fixture.debugElement.injector.get(Store);
      tick(1000);
      expect(location.path()).toBe('/list/collections/subject/2/area/1');
      expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
      //expect(component.getCollectionsByArea).not.toHaveBeenCalled();
      //expect(component.getCollectionsBySubject).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionSubjectAction('2', '1'));

    });
  })));


});
