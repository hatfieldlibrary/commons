/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, fakeAsync, tick, ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store} from '@ngrx/store';
import {MaterialModule} from '@angular/material';
import {Location} from '@angular/common';

import {appRoutes} from '../app.module';
import {MainContainer} from './main.container';
import {ListComponent} from '../components/collection-list/list.component';
import {AreaComponent} from '../components/area-selector/area.component';
import {SubjectsComponent} from '../components/subject-selector/subjects.component';

import * as fromRoot from '../reducers';
import * as listActions from '../actions/collection.actions';
import * as areaActions from '../actions/area.actions';
import {ImageHeaderComponent} from '../components/image-header/image-header.component';
import {AreaInformationComponent} from '../components/area-information/area-information.component';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppComponent} from '../components/app.component';
import {PageNotFoundComponent} from '../shared/components/page-not-found/page-not-found.component';

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
    Tag: {
      id: '1',
      name: 'test tag'
    }

  }];

class MockStore {
  select = () => {
  };
  dispatch = jasmine.createSpy('dispatch');
}

describe('MainContainer', () => {
  let component: MainContainer;
  let fixture: ComponentFixture<AppComponent>;
  let mainFixture: ComponentFixture<MainContainer>;
  let router;
  let location;
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
      providers: [
        {
          provide: Store,
          useClass: MockStore
        }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {

    let injector = getTestBed();
    location = injector.get(Location);
    router = injector.get(Router);
    fixture = TestBed.createComponent(AppComponent);
    mainFixture = TestBed.createComponent(MainContainer);
    component = mainFixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should recognize that areas are available in the store', fakeAsync(() => {
    spyOn(component, 'setAreasAvailable').and.callThrough();
    // Set observable for mock area list.
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaSubscriptionMock])
    });
    component.ngOnInit();
    tick(50);
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(component.areasAvailable).toBeTruthy();

  }));

  it('should use existing area list from the store.', fakeAsync(() => {
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaSubscriptionMock])
    });
    router.navigate(['list/collections/area/1']);
    tick(50);
    expect(location.path()).toBe('/list/collections/area/1');
    // If areas exist, dispatch should NOT be called.
    expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));

  }));

  it('should recognize that no areas are available in store.', fakeAsync(() => {
    spyOn(component, 'setAreasAvailable');
    spyOn(store, 'select').and.callFake(() => {
      return Observable.of([])
    });
    component.ngOnInit();
    tick(50);
    expect(component.setAreasAvailable).toHaveBeenCalled();
    expect(component.areasAvailable).toBeFalsy();

  }));

  it('should dispatch request to fetch the area list', fakeAsync(() => {
    spyOn(store, 'select').and.callFake(() => {
      return Observable.of([])
    });
    router.navigate(['list/collections/area/1']);
    tick(50);
    expect(location.path()).toBe('/list/collections/area/1');
    // No areas exist in store, dispatch should have been called.
    expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaAction('1'));

  }));

  it('should dispatch request for collections by area', async(() => {
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaSubscriptionMock])
    });
    router.navigate(['list/collections/area/1']).then(() => {
      expect(location.path()).toBe('/list/collections/area/1');
      expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
      expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionAction('1'));
      expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaInformationUpdate('1'));

    });

  }));

  it('should dispatch request for collections by subject', async(() => {
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaSubscriptionMock])
    });
    router.navigate(['list/collections/subject/2/area/1']).then(() => {
      expect(location.path()).toBe('/list/collections/subject/2/area/1');
      expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
      expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionSubjectAction('2', '1'));

    });
  }));

  it('should return all collections.', async(() => {
    spyOn(store, 'select').and.callFake(() => {
      return Observable.from([areaSubscriptionMock])
    });
    router.navigate(['list/collections/area/0']).then(() => {
      expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
      expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionAction('1'));
      expect(store.dispatch).not.toHaveBeenCalledWith();

    });
  }));

});
