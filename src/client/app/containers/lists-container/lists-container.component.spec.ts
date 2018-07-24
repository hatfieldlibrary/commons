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
import {async, tick, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {Observable} from 'rxjs';
import {ActivatedRoute, ActivatedRouteSnapshot, Data, Params, Route, Router, UrlSegment} from '@angular/router';

import {ListsContainerComponent} from './lists-container.component';
import {SubjectsComponent} from '../../components/subject-selector/subjects.component';

import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectActions from '../../actions/subject-actions';

import {AppComponent} from '../../components/app.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {SearchSvgComponent} from '../../components/svg/search-svg/search-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
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
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output, Type} from '@angular/core';
import {SetAreaFilter} from '../../actions/filter.actions';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter';
import {AreaType} from '../../shared/data-types/area.type';
import * as fromFilter from '../../reducers/filter.reducers';
import {SubjectFilter} from '../../shared/data-types/subject-filter';
import {TypesFilter} from '../../shared/data-types/types-filter';
import set = Reflect.set;


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

const areaListMock = [
  {
    id: 1,
    name: 'areas one'
  }
];

const mulitpleAreaListMock = [
  {
    id: 1,
    name: 'areas one'
  },
  {
    id: 1,
    name: 'areas two'
  }
];

const areaList = areaListMock;

const areasMock = areaSubscriptionMock;

const setAllRoute = (route: any) => {
  route.params = Observable.of({});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setAreaRoute = (route: any, mock: string) => {
  route.params = Observable.of({areaId: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setAreaRouteWithQueryParam = (route: any, path: string, query: string) => {
  route.params = Observable.of({areaId: path});
  route.queryParams = Observable.of({view: query});
  spyOn(route.queryParams, 'subscribe').and.callThrough();
};

const setSubjectAreaRoute = (route: any, area: string, subject: string) => {
  route.params = Observable.of({areaId: area, subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

const setSubjectRoute = (route: any, subject: string) => {
  route.params = Observable.of({subjectId: subject});
  spyOn(route.params, 'subscribe').and.callThrough();
};

@Component({
  selector: 'app-area-banner',
  template: '<p>Mock Product Editor Component</p>'
})
class MockAreaBannerComponent {
  @Input()
  areaInfo: AreaType;
  @Output()
  removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  filters: fromFilter.State;
  @Input()
  areas: AreasFilter;
  @Input()
  subjects: SubjectFilter;
  @Input()
  types: TypesFilter;
  @Input()
  groups: CollectionGroupFilter;
}

@Component({
  selector: 'app-area-options',
  template: '<p>Mock Product Editor Component</p>'
})
class MockAreaOptionsComponent {
  @Input()
  filter: AreasFilter;
  @Output() areaNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeFilter: EventEmitter<any> = new EventEmitter<any>();

}

const fakeObservableMedia = {
  asObservable: () => {
    return Observable.of({})
  }
} as ObservableMedia;


fdescribe('ListsContainerComponent', () => {

  let component: ListsContainerComponent;
  let fixture: ComponentFixture<ListsContainerComponent>;
  let store;
  let route;
  let setSelectedService;
  let selectedSubscriptionSpy;
  let dispatchService;
  let navigationService;
  let watcher: Subscription;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        MockAreaBannerComponent,
        MockAreaOptionsComponent,
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
        ViewListComponent
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
        MatTooltipModule
      ],
      providers: [
        LoggerService,
        SetTimeoutService,
        NavigationServiceB,
        MenuInteractionService,
        SetIntervalService,
        FilterUpdateServiceB,
        ScrollReadyService,
        SetSelectedService,
        {
          provide: DispatchService,
          useClass: class {
            dispatchActions = jasmine.createSpy('dispatchActions');
            getAllAreas = () => {
              return areaListMock;
            };
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(areaList);
            };
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Observable<any>(),
            queryParams: new Observable<any>()
          }
        },
        {
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            }
          }
        }
      ]
    }).overrideComponent(AreaOptionsComponent, {
      set: {
        selector: 'app-area-options',
        template: `<h6>Area Options</h6>`
      }
    }).overrideComponent(AreaFiltersComponent, {
      set: {
        selector: 'app-area-filters',
        template: `<h6>Area Filters</h6>`
      }
    });

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ListsContainerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    dispatchService = fixture.debugElement.injector.get(DispatchService);
    navigationService = fixture.debugElement.injector.get(NavigationServiceB);
    setSelectedService = fixture.debugElement.injector.get(SetSelectedService);
    selectedSubscriptionSpy = spyOn(setSelectedService, 'unsubscribe');
    store.dispatch(new SetAreaFilter([{id: 1, name: ''}]));
    fixture.detectChanges();
    spyOn(store, 'select').and.callThrough();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigation service for area', fakeAsync(() => {
    setAreaRoute(route, '1');
    component.ngOnInit();
    spyOn(navigationService, 'navigateFilterRoute');
    component.areaNavigation({selected: [{id: 1, name: 'test'}]})

  }));

  it('should dispatch data request for area information', fakeAsync(() => {
    setAreaRoute(route, '1');
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    tick();
    expect(dispatchService.dispatchActions).toHaveBeenCalledWith('1', undefined, undefined, undefined);
  }));

  it('should remove listeners when component is destroyed', () => {
    component.ngOnInit();
    fixture.detectChanges();
    watcher = component.watchers;
    spyOn(watcher, 'unsubscribe');
    fixture.destroy();
    expect(selectedSubscriptionSpy).toHaveBeenCalled();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  });

  it ('should act on view query parameter if present in the route', fakeAsync(() => {
    setAreaRouteWithQueryParam(route, '1', 'grid');
    const setView = spyOn(component, 'setView');
    component.ngOnInit();
    expect(route.queryParams.subscribe).toHaveBeenCalled();
    tick();
    expect(setView).toHaveBeenCalledWith({view: 'grid'});
  }));

  it ('should remove the current area filter and all additional filters', fakeAsync(() => {
    setAreaRoute(route, '1');
    spyOn(navigationService, 'navigateFilterRoute');
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas);
    tick();
    component.removeFilter({type: 'area', id: 1});
    // expect(navigationService.navigateFilterRoute).toHaveBeenCalledWith('', '', '', '');
    expect(navigationService.navigateFilterRoute).not.toHaveBeenCalled();
    expect(component.areaId).toEqual('');
    expect(component.groupId).toEqual('');
    expect(component.subjectId).toEqual('');
    expect(component.typeId).toEqual('');
  }));

});
