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

/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {} from 'jasmine';
import {SetTimeoutService} from '../services/timers/timeout.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuInteractionService} from '../services/menu/menu-interaction.service';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {CollectionsSvgComponent} from 'app/components/svg/collections-svg/collections-svg.component';
import {HomeSvgComponent} from './svg/home-svg/home-svg.component';
import {CloseSvgComponent} from './svg/close-svg/close-svg.component';
import {BackSvgComponent} from './svg/back-svg/back-svg.component';
import {HomeBlackSvgComponent} from './svg/home-black-svg/home-black-svg.component';
import {MenuSvgComponent} from './svg/menu-svg/menu-svg.component';
import {
  MatCheckboxModule,
  MatDivider,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatListItem,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import {SetSelectedService} from '../services/set-selected.service';
import {NavigationServiceB} from '../services/navigation-2/navigation.service';
import {ScrollReadyService} from '../services/observable/scroll-ready.service';
import {LoggerService} from '../shared/logger/logger.service';
import {HttpClientModule} from '@angular/common/http';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

@Component({
  selector: 'app-dummy-component',
  template: '<div></div>'
})
class MockComponent {
  constructor() {
  }

}

/**
 * Mock timeout in which the callback is immediately executed.
 */
class MockTimeoutService {

  clearTimeout = jasmine.createSpy('clearInterval');
  setTimeout(time: number, callback: () => void): any {
    callback();
  }


}
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store;


  const mockAreaList: FieldFilterType[] =  [
    {
      id: 1,
      name: 'areas one'
    }
  ];

  class MockInteractionService {

    private menuOpenSource = new Subject<boolean>();

    public openMenu$ = this.menuOpenSource.asObservable();

    openMenu() {
      this.menuOpenSource.next()
    }

  }

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenuSvgComponent,
        HomeBlackSvgComponent,
        BackSvgComponent,
        CloseSvgComponent,
        HomeSvgComponent,
        CollectionsSvgComponent,
        MockComponent
      ],
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatListModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path: 'commons/item', component: MockComponent},
          {path: 'commons/collection', component: MockComponent}
        ]),
        // needed to test ObservableMedia
        FlexLayoutModule

      ],
      providers: [
        SetSelectedService,
        NavigationServiceB,
        ScrollReadyService,
        LoggerService,
        {
          provide: SetTimeoutService,
          useClass: MockTimeoutService
        },
        {
          provide: MenuInteractionService,
          useClass: MockInteractionService
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select(): Observable<FieldFilterType[]> {
              return Observable.of(mockAreaList);
            };
          }
        },
        {
          provide: ScrollReadyService,
          useClass: class {
            subscribe = jasmine.createSpy('subscribe');
            setPosition = jasmine.createSpy('setPosition');
          }
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
   // fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);

  });

  it('should create the app and add subscription to watcher', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get openMenu observable and subscribe', fakeAsync(() => {
    const menuService = fixture.debugElement.injector.get(MenuInteractionService);
    spyOn(menuService.openMenu$, 'subscribe');
    spyOn(component.watcher, 'add');
    component.ngOnInit();
    tick();
    expect(menuService.openMenu$.subscribe).toHaveBeenCalled();
    expect(component.watcher.add).toHaveBeenCalled();
  }));


  it('should open the navigation menu via the menu interaction service', fakeAsync(() => {
    const menuService = fixture.debugElement.injector.get(MenuInteractionService);
    spyOn(menuService.openMenu$, 'subscribe').and.callThrough();
    component.ngOnInit();
    tick();
    expect(menuService.openMenu$.subscribe).toHaveBeenCalled();
    menuService.openMenu();
    expect(component.sideNavigate).toBeDefined();
    component.sideNavigate.open().then(() => {
      expect(component.sideNavigate.opened).toBe(true);
    });
  }));

  // it('should set the cdk-scrollable element scrollTop to zero',  fakeAsync(() => {
  //   const timeoutService = fixture.debugElement.injector.get(SetTimeoutService);
  //   router = fixture.debugElement.injector.get(Router);
  //   fixture.detectChanges();
  //   spyOn(timeoutService, 'setTimeout').and.callThrough();
  //   router.navigate(['commons/item']).then(() => {
  //     // expect(timeoutService.setTimeout).toHaveBeenCalled();
  //     // expect(component.scrollable.scrollTop).toEqual(0);
  //   });
  //   tick();
  //  // expect(timeoutService.setTimeout).toHaveBeenCalled();
  //   expect(component.scrollable.scrollTop).toEqual(0);
  // }));


});
