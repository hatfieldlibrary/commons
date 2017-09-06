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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdIconModule, MdInputModule, MdListModule, MdSelectModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListsContainerComponent } from './lists-container.component';
import { ListComponent } from '../../components/collection-list/list.component';
import { NavigationComponent } from '../../components/area-selector/area.component';
import { SubjectsComponent } from '../../components/subject-selector/subjects.component';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectActions from '../../actions/subject-actions';
import { AreaInformationComponent } from '../../components/area-information/area-information.component';
import { AppComponent } from '../../components/app.component';
import { HomeScreenComponent } from "../../components/home-screen/home-screen.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SearchSvgComponent } from "../../components/svg/search-svg/search-svg.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MenuSvgComponent } from "../../components/svg/menu-svg/menu-svg.component";
import { CloseSvgComponent } from "../../components/svg/close-svg/close-svg.component";
import { LockSvgComponent } from "../../components/svg/lock-svg/lock-svg.component";
import { BackSvgComponent } from "../../components/svg/back-svg/back-svg.component";
import { AppMenusComponent } from "../../components/apps-menu/app-menus.component";
import { HomeSvgComponent } from "../../components/svg/home-svg/home-svg.component";
import { CollectionsSvgComponent } from "../../components/svg/collections-svg/collections-svg.component";
import { CloseWhiteSvgComponent } from "../../components/svg/close-white-svg/close-white-svg.component";
import { CollectionsFilterPipe } from "../../services/filters/collections-filter.pipe";
import { TitleHeaderComponent } from "../../components/title-header/title-header.component";
import { KeyboardArrowForwardSvgComponent } from "../../components/svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import { KeyboardArrowBackSvgComponent } from "../../components/svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import { HomeBlackSvgComponent } from "../../components/svg/home-black-svg/home-black-svg.component";
import { UtilitiesService } from "../../services/utilities.service";
var areaSubscriptionMock = {
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
};
var areaListMock = [
    {
        id: 1,
        title: 'area one',
        count: 1
    }
];
var areaList = areaListMock;
var areasMock = areaSubscriptionMock;
//
// const setParamMock = (mockRoute) => {
//   if (mockRoute) {
//     this.params = Observable.of(mockRoute);
//   } else {
//     this.params = Observable.of({});
//   }
// };
var MockActivatedRoute = (function (_super) {
    __extends(MockActivatedRoute, _super);
    function MockActivatedRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockActivatedRoute;
}(ActivatedRoute));
// class MockStore<T> extends Store<any> {
//
//   select = () => {
//     return Observable.of(areaList);
//   };
//   dispatch (action: Action) {};
//
// }
var setAllRoute = function (route) {
    route.params = Observable.of({});
    spyOn(route.params, 'subscribe').and.callThrough();
};
var setAreaRoute = function (route, mock) {
    route.params = Observable.of({ areaId: mock });
    spyOn(route.params, 'subscribe').and.callThrough();
};
var setSubjectAreaRoute = function (route, area, subject) {
    route.params = Observable.of({ areaId: area, subjectId: subject });
    spyOn(route.params, 'subscribe').and.callThrough();
};
var setSubjectRoute = function (route, subject) {
    route.params = Observable.of({ subjectId: subject });
    spyOn(route.params, 'subscribe').and.callThrough();
};
describe('ListsContainerComponent', function () {
    var component;
    var fixture;
    var store;
    var route;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                BackSvgComponent,
                LockSvgComponent,
                MenuSvgComponent,
                CloseSvgComponent,
                CloseWhiteSvgComponent,
                AppComponent,
                NavigationComponent,
                ListComponent,
                ListsContainerComponent,
                SubjectsComponent,
                AreaInformationComponent,
                HomeScreenComponent,
                FooterComponent,
                SearchSvgComponent,
                TitleHeaderComponent,
                AppMenusComponent,
                HomeSvgComponent,
                HomeBlackSvgComponent,
                CollectionsSvgComponent,
                KeyboardArrowForwardSvgComponent,
                KeyboardArrowBackSvgComponent,
                CollectionsFilterPipe
            ],
            imports: [
                FlexLayoutModule,
                MdButtonModule,
                MdCardModule,
                MdListModule,
                MdToolbarModule,
                MdSidenavModule,
                MdInputModule,
                MdIconModule,
                MdSelectModule,
                MdChipsModule,
                BrowserModule,
                BrowserAnimationsModule,
                HttpModule,
                ReactiveFormsModule,
                MdCheckboxModule,
                FormsModule,
                RouterTestingModule,
            ],
            providers: [
                UtilitiesService,
                {
                    provide: Store,
                    useClass: (function () {
                        function class_1() {
                            this.dispatch = jasmine.createSpy('dispatch');
                            this.select = function () {
                                return Observable.of(areaList);
                            };
                        }
                        return class_1;
                    }())
                },
                {
                    provide: ActivatedRoute,
                    useValue: { params: new Observable() }
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        areaList = areaListMock;
        TestBed.createComponent(AppComponent);
        fixture = TestBed.createComponent(ListsContainerComponent);
        store = fixture.debugElement.injector.get(Store);
        route = fixture.debugElement.injector.get(ActivatedRoute);
        component = fixture.componentInstance;
        spyOn(store, 'select').and.callThrough();
        //spyOn(store, 'dispatch');
        spyOn(component, 'getAllCollectionsForSubject').and.callThrough();
        spyOn(component, 'initializeAreas').and.callThrough();
        spyOn(component, 'getAreaInformation').and.callThrough();
        spyOn(component, 'getCollectionsByArea').and.callThrough();
        spyOn(component, 'getCollectionsBySubject').and.callThrough();
        spyOn(component, 'getAllCollections').and.callThrough();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should fetch all collections if no area id provided in route parameters.', fakeAsync(function () {
        setAllRoute(route);
        //spyOn(route.params, 'subscribe').and.callThrough();
        component.ngOnInit();
        tick();
        expect(component.getAllCollections).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new listActions.AllCollectionsAction);
        expect(store.dispatch).toHaveBeenCalledWith(new subjectActions.AllSubjectAction());
    }));
    it('should not update area id if unchanged,', fakeAsync(function () {
        setAreaRoute(route, 'default');
        spyOn(component, 'setAreasAvailable').and.callThrough();
        expect(component.areasAvailable).toBeFalsy();
        component.ngOnInit();
        expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
        expect(component.setAreasAvailable).toHaveBeenCalled();
        expect(route.params.subscribe).toHaveBeenCalled();
        tick();
        // If areaList store has elements, areasAvailable should be true after ngOnInit.
        expect(component.areasAvailable).toBeTruthy();
        // If areasAvailable is truthy, dispatch should NOT be called.
        expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));
    }));
    it('should use the existing area list from the store.', fakeAsync(function () {
        setAreaRoute(route, '1');
        areaListMock = areaList;
        spyOn(component, 'setAreasAvailable').and.callThrough();
        expect(component.areasAvailable).toBeFalsy();
        component.ngOnInit();
        expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
        expect(component.setAreasAvailable).toHaveBeenCalled();
        expect(route.params.subscribe).toHaveBeenCalled();
        tick();
        // If areaList store has elements, areasAvailable should be true after ngOnInit.
        expect(component.areasAvailable).toBeTruthy();
        expect(component.initializeAreas).toHaveBeenCalled();
        // If areasAvailable is truthy, dispatch should NOT be called.
        expect(store.dispatch).not.toHaveBeenCalledWith(new areaActions.AreaAction('1'));
    }));
    it('should dispatch request to fetch the area list', fakeAsync(function () {
        setAllRoute(route);
        //  Set areaList store mock to empty array. This should trigger request for area list.
        areaList = [
            {
                id: 0,
                title: '',
                count: 0
            }
        ];
        spyOn(component, 'setAreasAvailable').and.callThrough();
        expect(component.areasAvailable).toBeFalsy();
        component.ngOnInit();
        expect(component.areasAvailable).toBeFalsy();
        expect(route.params.subscribe).toHaveBeenCalled();
        expect(component.setAreasAvailable).toHaveBeenCalled();
        // areasAvailable is false, dispatch should have been called.
        expect(component.initializeAreas).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaAction());
    }));
    it('should dispatch request for collections by area', fakeAsync(function () {
        setAreaRoute(route, '1');
        areasMock = areaSubscriptionMock;
        component.ngOnInit();
        tick();
        expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections);
        expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionAction('1'));
        expect(store.dispatch).toHaveBeenCalledWith(new areaActions.AreaInformation('1'));
    }));
    it('should dispatch request for collections by subject and area', fakeAsync(function () {
        setSubjectAreaRoute(route, '1', '2');
        component.ngOnInit();
        tick();
        expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
        expect(store.dispatch).toHaveBeenCalledWith(new listActions.CollectionSubjectAction('2', '1'));
    }));
    it('should dispatch request for collections by subject only', fakeAsync(function () {
        setSubjectRoute(route, '1');
        component.ngOnInit();
        tick();
        expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject);
        expect(store.dispatch).toHaveBeenCalledWith(new listActions.AllCollectionSubjectAction('1'));
        expect(store.dispatch).toHaveBeenCalledWith(new subjectActions.AllSubjectAction());
    }));
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/containers/lists-container/lists-container.component.spec.js.map