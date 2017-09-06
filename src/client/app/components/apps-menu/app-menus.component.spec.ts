import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {AppMenusComponent} from './app-menus.component';
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {MaterialModule, MdCheckboxModule, MdIconModule, MdIconRegistry, MdToolbarModule} from "@angular/material";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {NavigationComponent} from "../area-selector/area.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeSvgComponent} from "../svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../svg/collections-svg/collections-svg.component";
import {HomeBlackSvgComponent} from "../svg/home-black-svg/home-black-svg.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilitiesService} from "../../services/utilities.service";
import {NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {FlexLayoutModule, MediaChange, ObservableMedia} from "@angular/flex-layout";
import {DOCUMENT} from "@angular/common";
import {Inject, InjectionToken} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

class MockRouter {
  public navEnd = new NavigationEnd(0, 'http://localhost:3000', 'http://localhost:3000');
  public events = new Observable(observer => {
    observer.next(this.navEnd);
    observer.complete();
  });
  public dispose() {}
}

class MockMediaObserver {
  // https://github.com/angular/flex-layout/blob/master/src/lib/media-query/media-change.ts
 public mediaChange = new MediaChange(true, 'all', 'gt-lg', 'GtLg');

//  public mediaChange: MediaChange = null;
  public asObservable(): any {
    const change = Observable.of(this.mediaChange);
    return change
  }

}

class MockDocument {
   //public DOCUMENT = new InjectionToken<Document>('DocumentToken');
  public createElement() {}
  public classList() {}
}
class MockIcon {

}

describe('AppMenusComponent', () => {
  let component: AppMenusComponent;
  let fixture: ComponentFixture<AppMenusComponent>;

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
        MdToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdIconModule,
        RouterTestingModule,
        // needed to test ObservableMedia
        FlexLayoutModule

      ],
      providers: [
        UtilitiesService,
        // {
        //   provide: DOCUMENT,
        //   useValue: {value: document}
        // },
        //  {
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
   // let iconRegistry = TestBed.get(MdIconRegistry);
   // let sanitizer = TestBed.get(DomSanitizer);
   //  iconRegistry.addSvgIcon( 'app-icon-back','app-home-svg','app-menu-svg','app-icon-close','app-home-black-svg');
   //  sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg');
   //  sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_white_24px.svg');
   //  sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_white_24px.svg');
   //  sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_black_24px.svg');
    fixture = TestBed.createComponent(AppMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
