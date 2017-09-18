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

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {} from 'jasmine';
import {SetTimeoutService} from "../services/timers/timeout.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MenuInteractionService} from "../services/menu/menu-interaction.service";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {CollectionsSvgComponent} from "app/components/svg/collections-svg/collections-svg.component";
import {HomeSvgComponent} from "./svg/home-svg/home-svg.component";
import {NavigationComponent} from "./area-selector/area.component";
import {CloseSvgComponent} from "./svg/close-svg/close-svg.component";
import {BackSvgComponent} from "./svg/back-svg/back-svg.component";
import {HomeBlackSvgComponent} from "./svg/home-black-svg/home-black-svg.component";
import {MenuSvgComponent} from "./svg/menu-svg/menu-svg.component";
import {MdCheckboxModule, MdIconModule, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";
import {Component} from "@angular/core";

@Component({
  selector: 'dummy-component',
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
  let router;
  let callback;

  class MockInteractionService {

    private menuOpenSource = new Subject<boolean>();

    public openMenu$ = this.menuOpenSource.asObservable();

    openMenu() {
      this.menuOpenSource.next()
    }

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenuSvgComponent,
        HomeBlackSvgComponent,
        BackSvgComponent,
        CloseSvgComponent,
        NavigationComponent,
        HomeSvgComponent,
        CollectionsSvgComponent,
        MockComponent
      ],
      imports: [
        MdToolbarModule,
        MdSidenavModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdIconModule,
        RouterTestingModule.withRoutes([
          {path: 'commons/item', component: MockComponent},
          {path: 'commons/collection', component: MockComponent}
        ]),
        // needed to test ObservableMedia
        FlexLayoutModule

      ],
      providers: [
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
            select = () => {
              return Observable.of('');
            };
          }
        },
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

  });

  it('should create the app and add subscription to watcher', async(() => {
    spyOn(component.watcher, 'add');
    fixture.detectChanges();
    expect(component.watcher.add).toHaveBeenCalled();
    expect(component).toBeTruthy();
  }));

  it('should request areas list on init', () => {
    let store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'select').and.callThrough();
  });

  it('should get openMenu observable and subscribe', () => {
    let menuService = fixture.debugElement.injector.get(MenuInteractionService);
    spyOn(menuService.openMenu$, 'subscribe');
    spyOn(component.watcher, 'add');
    component.ngOnInit();
    expect(menuService.openMenu$.subscribe).toHaveBeenCalled();
    expect(component.watcher.add).toHaveBeenCalled();
  });


  it('should open the navigation menu via the menu interaction service', async(() => {
    let menuService = fixture.debugElement.injector.get(MenuInteractionService);
    spyOn(menuService.openMenu$, 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(menuService.openMenu$.subscribe).toHaveBeenCalled();
    menuService.openMenu();
    expect(component.sideNavigate).toBeDefined();
    component.sideNavigate.open().then(() => {
      expect(component.sideNavigate.opened).toBe(true);
    });
  }));

  it('should pop value onto the scroll position stack', async(() => {
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    spyOn(component.yScrollStack, 'push').and.callThrough();
    router.navigate(['commons/item']).then(() => {
      expect(component.yScrollStack.push).toHaveBeenCalled();
    });
  }));


  it('should not pop value onto the scroll position stack', async(() => {
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    spyOn(component.yScrollStack, 'push').and.callThrough();
    router.navigate(['commons/collection']).then(() => {
      expect(component.yScrollStack.push).not.toHaveBeenCalled();
    });
  }));

  it('should pop value off of the position stack to apply to collection list',  async(() => {
    const timeoutService = fixture.debugElement.injector.get(SetTimeoutService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    spyOn(timeoutService, 'setTimeout').and.callThrough();
    spyOn(component.yScrollStack, 'pop').and.callThrough();
    router.navigate(['commons/collection']).then(() => {
      expect(timeoutService.setTimeout).toHaveBeenCalled();
      expect(component.yScrollStack.pop).toHaveBeenCalled();
    });
  }));

  it('should set the cdk-scrollable element scrollTop to zero',  async(() => {
    const timeoutService = fixture.debugElement.injector.get(SetTimeoutService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    spyOn(timeoutService, 'setTimeout').and.callThrough();
    router.navigate(['commons/item']).then(() => {
      expect(timeoutService.setTimeout).toHaveBeenCalled();
      expect(component.scrollable.scrollTop).toEqual(0);
    });
  }));


});
