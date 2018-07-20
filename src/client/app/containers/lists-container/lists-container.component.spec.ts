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

/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, Action, StoreModule} from '@ngrx/store';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListItem,
  MatListModule,
  MatListOption,
  MatNavList,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {ListsContainerComponent} from './lists-container.component';
import {SubjectsComponent} from '../../components/subject-selector/subjects.component';

import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectActions from '../../actions/subject-actions';

import {AppComponent} from '../../components/app.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {SearchSvgComponent} from '../../components/svg/search-svg/search-svg.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {HttpModule} from "@angular/http";
import {MenuSvgComponent} from '../../components/svg/menu-svg/menu-svg.component';
import {CloseSvgComponent} from '../../components/svg/close-svg/close-svg.component';
import {LockSvgComponent} from '../../components/svg/lock-svg/lock-svg.component';
import {BackSvgComponent} from '../../components/svg/back-svg/back-svg.component';
import {AppMenusComponent} from '../../components/apps-menu/app-menus.component';
import {HomeSvgComponent} from '../../components/svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../../components/svg/collections-svg/collections-svg.component';
import {CloseWhiteSvgComponent} from '../../components/svg/close-white-svg/close-white-svg.component';
import {CollectionsFilterPipe} from '../../services/filters-2/collections-filter.pipe';
import {KeyboardArrowForwardSvgComponent} from '../../components/svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component';
import {KeyboardArrowBackSvgComponent} from '../../components/svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component';
import {HomeBlackSvgComponent} from '../../components/svg/home-black-svg/home-black-svg.component';
import {SetIntervalService} from '../../services/timers/interval.service';
import {Subscription} from 'rxjs/Subscription';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../services/timers/timeout.service';
import {TypesComponent} from '../../components/types/types.component';
import {HttpClientModule} from '@angular/common/http';
import {AreaBannerComponent} from '../../components/area-banner/area-banner.component';
import {SubjectOptionsComponent} from '../../components/subject-options/subject-options.component';
import {CollectionRowsComponent} from '../../components/collection-rows/collection-rows.component';
import {CollectionGridComponent} from '../../components/collection-grid/collection-grid.component';
import {GroupOptionsComponent} from '../../components/group-options/group-options.component';
import {AreaFiltersComponent} from '../../components/area-filters/area-filters.component';
import {CloseSvgDisabledComponent} from '../../components/svg/close-svg-disabled/close-svg-disabled.component';
import {ViewGridComponent} from '../../components/svg/view-grid/view-grid.component';
import {ViewListComponent} from '../../components/svg/view-list/view-list.component';
import {AreaOptionsComponent} from '../../components/area-options/area-options.component';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {SetSelectedService} from '../../services/set-selected.service';
import {DispatchService} from '../../services/dispatch.service';
import {LoggerService} from '../../shared/logger/logger.service';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';

const areaSubscriptionMock = {
  id: 1,
  title: 'test',
  name: 'test subject',
  linkLabel: '',
  url: '',
  searchUrl: '',
  description: '',
  position: 1,
  Tag: { // This added so test works with subjects template.
    id: '1',
    name: 'test tag'
  }

};

let areaListMock = [
  {
    id: 1,
    title: 'areas one',
    count: 1
  }
];

const mulitpleAreaListMock = [
  {
    id: 1,
    title: 'areas one',
    count: 1
  },
  {
    id: 1,
    title: 'areas two',
    count: 1
  }
];

let areaList = areaListMock;

let areasMock = areaSubscriptionMock;

const setAllRoute = (route: any) => {
  route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setAreaRoute = (route: any, mock: string) => {
  route.params = Observable.of({areaId: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectAreaRoute = (route: any, area: string, subject: string) => {
  route.params = Observable.of({areaId: area, subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectRoute = (route: any, subject: string) => {
  route.params = Observable.of({subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

fdescribe('ListsContainerComponent', () => {

  let component: ListsContainerComponent;
  let fixture: ComponentFixture<ListsContainerComponent>;
  let store;
  let route;
  let watcher: Subscription;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AreaFiltersComponent,
        BackSvgComponent,
        LockSvgComponent,
        MenuSvgComponent,
        CloseSvgComponent,
        AppComponent,
        CollectionRowsComponent,
        CollectionGridComponent,
        ListsContainerComponent,
        SubjectOptionsComponent,
        GroupOptionsComponent,
        AreaBannerComponent,
        FooterComponent,
        SearchSvgComponent,
        AppMenusComponent,
        HomeSvgComponent,
        HomeBlackSvgComponent,
        CollectionsSvgComponent,
        KeyboardArrowForwardSvgComponent,
        KeyboardArrowBackSvgComponent,
        CollectionsFilterPipe,
        TypesComponent,
        CloseSvgDisabledComponent,
        CloseWhiteSvgComponent,
        ViewGridComponent,
        ViewListComponent,
        AreaOptionsComponent
      ],
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatTooltipModule,
        StoreModule.forRoot({})
      ],
      providers: [
        LoggerService,
        DispatchService,
        SetSelectedService,
        SetTimeoutService,
        NavigationServiceB,
        MenuInteractionService,
        SetIntervalService,
        FilterUpdateServiceB,
        // {
        //   provide: Store,
        //   useClass: class {
        //     dispatch = jasmine.createSpy('dispatch');
        //     select = () => {
        //       return Observable.of(areaList);
        //     };
        //   }
        // },
        // {
        //   provide: ActivatedRoute,
        //   useValue: {params: new Observable<any>()}
        // }
      ]
    });

  }));


  beforeEach(() => {
    areaList = areaListMock;
    fixture = TestBed.createComponent(ListsContainerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    spyOn(store, 'select').and.callThrough();

  });


  it('should create',  () => {
    expect(component).toBeTruthy();
  });


  it('should remove listeners when component is destroyed',  () => {
   // fixture.detectChanges();
    // watchers is undefined...?
    watcher = component.watchers;
    console.log(watcher)
    spyOn(watcher, 'unsubscribe');
    fixture.destroy();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  });


});
