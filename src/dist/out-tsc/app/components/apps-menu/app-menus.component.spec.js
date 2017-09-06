import { async, TestBed } from '@angular/core/testing';
import { AppMenusComponent } from './app-menus.component';
import { MenuSvgComponent } from "../svg/menu-svg/menu-svg.component";
import { BackSvgComponent } from "../svg/back-svg/back-svg.component";
import { MdCheckboxModule, MdIconModule, MdToolbarModule } from "@angular/material";
import { CloseSvgComponent } from "../svg/close-svg/close-svg.component";
import { NavigationComponent } from "../area-selector/area.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeSvgComponent } from "../svg/home-svg/home-svg.component";
import { CollectionsSvgComponent } from "../svg/collections-svg/collections-svg.component";
import { HomeBlackSvgComponent } from "../svg/home-black-svg/home-black-svg.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitiesService } from "../../services/utilities.service";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { FlexLayoutModule, MediaChange } from "@angular/flex-layout";
var MockRouter = (function () {
    function MockRouter() {
        var _this = this;
        this.navEnd = new NavigationEnd(0, 'http://localhost:3000', 'http://localhost:3000');
        this.events = new Observable(function (observer) {
            observer.next(_this.navEnd);
            observer.complete();
        });
    }
    MockRouter.prototype.dispose = function () { };
    return MockRouter;
}());
var MockMediaObserver = (function () {
    function MockMediaObserver() {
        // https://github.com/angular/flex-layout/blob/master/src/lib/media-query/media-change.ts
        this.mediaChange = new MediaChange(true, 'all', 'gt-lg', 'GtLg');
    }
    //  public mediaChange: MediaChange = null;
    MockMediaObserver.prototype.asObservable = function () {
        var change = Observable.of(this.mediaChange);
        return change;
    };
    return MockMediaObserver;
}());
var MockDocument = (function () {
    function MockDocument() {
    }
    //public DOCUMENT = new InjectionToken<Document>('DocumentToken');
    MockDocument.prototype.createElement = function () { };
    MockDocument.prototype.classList = function () { };
    return MockDocument;
}());
var MockIcon = (function () {
    function MockIcon() {
    }
    return MockIcon;
}());
describe('AppMenusComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
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
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                            this.select = function () {
                                return Observable.of('');
                            };
                        }
                        return class_1;
                    }())
                },
                {
                    provide: Router,
                    useClass: MockRouter
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
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
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/components/apps-menu/app-menus.component.spec.js.map