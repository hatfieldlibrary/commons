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

import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {AppMenusComponent} from './app-menus.component';
import {
  MatCheckboxModule, MatDividerModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuInteractionService} from '../../core/services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../core/services/timers/timeout.service';
import {NavigationServiceB} from '../../core/services/navigation-2/navigation.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../shared.module';

class MockRouter {
  public navEnd = new NavigationEnd(0, 'http://localhost:3000', 'http://localhost:3000');
  public events = new Observable(observer => {
    observer.next(this.navEnd);
    observer.complete();
  });

  public dispose() {
  }
}

describe('AppMenusComponent', () => {
  let component: AppMenusComponent;
  let fixture: ComponentFixture<AppMenusComponent>;
  let utilSvc;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
       // AppMenusComponent,
      ],
      imports: [
        CoreModule,
        SharedModule,
       // SvgModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatIconModule,
        RouterTestingModule,
        MatTooltipModule,
        MatDividerModule,
        HttpClientModule,
        // needed to test ObservableMedia
        FlexLayoutModule

      ],
      providers: [
        {
          provide: SetTimeoutService,
          useClass: SetTimeoutService
        },
        {
          provide: MenuInteractionService,
          useClass: MenuInteractionService
        },
        {
          provide: NavigationServiceB,
          useValue: {
            getBackLink: () => {
              return 'test link'
            },
            getIds: () => {}
          }
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
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenusComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    utilSvc = fixture.debugElement.injector.get(NavigationServiceB);
    spyOn(utilSvc, 'getBackLink').and.callThrough();

  });

  // TODO: tests stopped working when this component was moved to a shared module.

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should get back link', () => {
  //   component.getBackLink();
  //   expect(utilSvc.getBackLink).toHaveBeenCalled();
  //   const path = component.getBackLink();
  //   expect(path).toEqual('test link');
  // });

  // it('should animate scroll request', (done) => {
  //   fixture.whenStable().then(
  //     () => {
  //       spyOn(component.sideNavigate, 'open');
  //       component.openMenu();
  //       expect(component.sideNavigate.open).toHaveBeenCalled();
  //       done();
  //     }
  //   );
  // });

  // it('should remove listeners when component is destroyed', () => {
  //   watcher = component.watcher;
  //   spyOn(watcher, 'unsubscribe');
  //   fixture.destroy();
  //   expect(watcher.unsubscribe).toHaveBeenCalled();
  // });

});
