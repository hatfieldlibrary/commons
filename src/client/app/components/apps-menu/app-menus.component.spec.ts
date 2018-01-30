import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {AppMenusComponent} from './app-menus.component';
import {MenuSvgComponent} from '../svg/menu-svg/menu-svg.component';
import {BackSvgComponent} from '../svg/back-svg/back-svg.component';
import {
   MatCheckboxModule, MatIconModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {CloseSvgComponent} from '../svg/close-svg/close-svg.component';
import {NavigationComponent} from '../area-selector/area.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeSvgComponent} from '../svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../svg/collections-svg/collections-svg.component';
import {HomeBlackSvgComponent} from '../svg/home-black-svg/home-black-svg.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Subscription} from 'rxjs/Subscription';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../services/timers/timeout.service';

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
  let watcher: Subscription;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppMenusComponent,
        MenuSvgComponent,
        HomeBlackSvgComponent,
        BackSvgComponent,
        CloseSvgComponent,
        NavigationComponent,
        HomeSvgComponent,
        CollectionsSvgComponent
      ],
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatIconModule,
        RouterTestingModule,
        // needed to test ObservableMedia
        FlexLayoutModule

      ],
      providers: [
        SetTimeoutService,
        MenuInteractionService,
        {
      //    provide: UtilitiesService,
          useValue: {
            getBackLink: () => {
              return 'test link'
            }
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
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   // utilSvc = fixture.debugElement.injector.get(UtilitiesService);
    spyOn(utilSvc, 'getBackLink').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get back link', () => {
    component.getBackLink();
    expect(utilSvc.getBackLink).toHaveBeenCalled();
    const path = component.getBackLink();
    expect(path).toEqual('test link');
  });

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

  it('should remove listeners when component is destroyed', () => {
    watcher = component.watcher;
    spyOn(watcher, 'unsubscribe');
    fixture.destroy();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  });

});
