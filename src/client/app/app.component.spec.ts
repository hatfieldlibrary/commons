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


import {of as observableOf, Observable, Subject} from 'rxjs';
/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {} from 'jasmine';
import {SetTimeoutService} from './core/services/timers/timeout.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuInteractionService} from './core/services/menu/menu-interaction.service';
import {Store} from '@ngrx/store';
import {HomeSvgComponent} from './shared/svg/home-svg/home-svg.component';
import {CloseSvgComponent} from './shared/svg/close-svg/close-svg.component';
import {BackSvgComponent} from './shared/svg/back-svg/back-svg.component';
import {HomeBlackSvgComponent} from './shared/svg/home-black-svg/home-black-svg.component';
import {MenuSvgComponent} from './shared/svg/menu-svg/menu-svg.component';
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
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {AreaFilterType} from './core/data-types/area-filter.type';
import {SetSelectedService} from './core/services/set-selected.service';
import {NavigationServiceB} from './core/services/navigation-2/navigation.service';
import {ScrollReadyService} from './core/services/observable/scroll-ready.service';
import {LoggerService} from './core/logger/logger.service';
import {HttpClientModule} from '@angular/common/http';
import {FieldFilterType} from './core/data-types/field-filter.type';
import {AppMenusComponent} from './shared/apps-menu/app-menus.component';
import {FooterComponent} from './shared/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';

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
        MockComponent
      ],
      imports: [
        CoreModule,
        SharedModule,
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
            pipe(): Observable<FieldFilterType[]> {
              return observableOf(mockAreaList);
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
