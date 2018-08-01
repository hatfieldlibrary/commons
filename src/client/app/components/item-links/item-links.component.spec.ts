import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ItemLinksComponent } from './item-links.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LockSvgComponent} from '../svg/lock-svg/lock-svg.component';
import {SearchSvgComponent} from '../svg/search-svg/search-svg.component';
import {SearchService} from '../../services/search.service';
import {ActivatedRoute} from '@angular/router';
import {AuthCheckService} from '../../services/auth-check.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ItemSelectComponent} from '../item-select-options/item-select.component';
import {DatePickerSvgComponent} from '../svg/date-picker-svg/date-picker-svg.component';
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';

describe('ItemLinksComponent', () => {
  let component: ItemLinksComponent;
  let fixture: ComponentFixture<ItemLinksComponent>;
  let watcher: Subscription;
  let store;
  let auth;
  let route;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent,
        DatePickerSvgComponent,
        ItemSelectComponent
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        MatIconModule, HttpClientModule
      ],
      providers: [
        SearchService,
        {
          provide: AuthCheckService,
          useValue: {
            getAuthStatus: () => Observable.of({})
          }
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
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of({});
            };
          }
        },
      ]
    });
  }));

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLinksComponent);
    store = fixture.debugElement.injector.get(Store);
    auth = fixture.debugElement.injector.get(AuthCheckService);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(route.url, 'map').and.callThrough();
    spyOn(store, 'select').and.callThrough();
    spyOn(auth, 'getAuthStatus').and.callThrough();
    component = fixture.componentInstance;
    watcher = component.watchers;
    spyOn(watcher, 'add');
  });

  it('should initialize the component', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(route.url.map).toHaveBeenCalled();
    expect(component.watchers.add).toHaveBeenCalled();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAuthStatus);
    expect(auth.getAuthStatus).toHaveBeenCalled();
  }));

  it('should remove subscriptions on destroy', fakeAsync(() => {
    spyOn(watcher, 'unsubscribe');
    component.ngOnDestroy();
    tick();
    expect(component.watchers.unsubscribe).toHaveBeenCalled();

  }));
});
