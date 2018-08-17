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

/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import {async, tick, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Action, Store} from '@ngrx/store';
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

import {CollectionViewComponent} from './collection-view.component';


import * as fromRoot from '../../../reducers/index';

import {AppComponent} from '../../app.component';
import {FooterComponent} from '../../footer/footer.component';
import {SearchSvgComponent} from '../../svg/search-svg/search-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MenuSvgComponent} from '../../svg/menu-svg/menu-svg.component';
import {CloseSvgComponent} from '../../svg/close-svg/close-svg.component';
import {LockSvgComponent} from '../../svg/lock-svg/lock-svg.component';
import {BackSvgComponent} from '../../svg/back-svg/back-svg.component';
import {AppMenusComponent} from '../../apps-menu/app-menus.component';
import {HomeSvgComponent} from '../../svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../../svg/collections-svg/collections-svg.component';
import {CloseWhiteSvgComponent} from '../../svg/close-white-svg/close-white-svg.component';
import {CollectionsFilterPipe} from '../../../services/filters-2/collections-filter.pipe';
import {KeyboardArrowForwardSvgComponent} from '../../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component';
import {KeyboardArrowBackSvgComponent} from '../../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component';
import {HomeBlackSvgComponent} from '../../svg/home-black-svg/home-black-svg.component';
import {SetIntervalService} from '../../../services/timers/interval.service';
import {Subscription} from 'rxjs/Subscription';
import {MenuInteractionService} from '../../../services/menu/menu-interaction.service';
import {SetTimeoutService} from '../../../services/timers/timeout.service';
import {TypesComponent} from '../types/types.component';
import {HttpClientModule} from '@angular/common/http';
import {SubjectOptionsComponent} from '../subject-options/subject-options.component';
import {CollectionRowsComponent} from '../collection-rows/collection-rows.component';
import {CollectionGridComponent} from '../collection-grid/collection-grid.component';
import {GroupOptionsComponent} from '../group-options/group-options.component';
import {AreaFiltersComponent} from '../area-filters/area-filters.component';
import {CloseSvgDisabledComponent} from '../../svg/close-svg-disabled/close-svg-disabled.component';
import {ViewGridComponent} from '../../svg/view-grid/view-grid.component';
import {ViewListComponent} from '../../svg/view-list/view-list.component';
import {AreaOptionsComponent} from '../area-options/area-options.component';
import {NavigationServiceB} from '../../../services/navigation-2/navigation.service';
import {SetSelectedService} from '../../../services/set-selected.service';
import {DispatchService} from '../../../services/dispatch.service';
import {LoggerService} from '../../../shared/logger/logger.service';
import {FilterUpdateServiceB} from '../../../services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../../services/observable/scroll-ready.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AreasFilter} from '../../../shared/data-types/areas-filter';
import {CollectionGroupFilter} from '../../../shared/data-types/collection-group-filter';
import {AreaType} from '../../../shared/data-types/area.type';
import * as fromFilter from '../../../reducers/filter.reducers';
import {SubjectFilter} from '../../../shared/data-types/subject-filter';
import {TypesFilter} from '../../../shared/data-types/types-filter';
import {Subject} from 'rxjs/Subject';
import {CollectionReset} from '../../../actions/collection.actions';
import {mockStore} from '../../../shared/test/mock-store';
import {SubscriptionService} from '../../../services/subscription.service';


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

const setAllRoutes = (route: any, area: string, subject: string, group: string, type: string) => {
  route.params = Observable.of({areaId: area, subjectId: subject, categoryId: group, typeId: type});
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



describe('CollectionListComponent', () => {

  let component: CollectionViewComponent;
  let fixture: ComponentFixture<CollectionViewComponent>;
  let route;
  let setSelectedService;
  let selectedSubscriptionSpy;
  let dispatchService;
  let navigationService;
  let watcher: Subscription;
  let store;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({ actions, states });

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
        CollectionViewComponent,
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
        SubscriptionService,
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
          useValue: appStore
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
    }).overrideComponent(AppMenusComponent, {
      set: {
        selector: 'app-menus-component',
        template: `<h6>Area Menu</h6>`
      }
    });

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    dispatchService = fixture.debugElement.injector.get(DispatchService);
    navigationService = fixture.debugElement.injector.get(NavigationServiceB);
    setSelectedService = fixture.debugElement.injector.get(SetSelectedService);
    selectedSubscriptionSpy = spyOn(setSelectedService, 'unsubscribe');
    // fixture.detectChanges();
    spyOn(store, 'select').and.callThrough();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigation service for area', fakeAsync(() => {
    setAreaRoute(route, '1');
    component.ngOnInit();
    spyOn(navigationService, 'navigateRoute');
    component.areaNavigation({selected: [{id: 1, name: 'test'}]})

  }));

  it('should dispatch data request for area information', fakeAsync(() => {
    setAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(dispatchService.dispatchActions).toHaveBeenCalledWith('1', undefined, undefined, undefined);
  }));

  it('should remove listeners when component is destroyed', fakeAsync(() => {
    component.ngOnInit();
    watcher = component.watchers;
    spyOn(watcher, 'unsubscribe');
    fixture.destroy();
    tick();
    expect(selectedSubscriptionSpy).toHaveBeenCalled();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  }));

  it('should act on view query parameter if present in the route', fakeAsync(() => {
    setAreaRouteWithQueryParam(route, '1', 'grid');
    const setView = spyOn(component, 'setView');
    component.ngOnInit();
    tick();
    expect(route.queryParams.subscribe).toHaveBeenCalled();
    expect(setView).toHaveBeenCalledWith({view: 'grid'});
  }));

  it('should remove the subject filter and call updated route', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1,2');
    component.areaId = '1';
    component.selectedSubjects = [{id: 1, name: 'sub1'}, {id: 2, name: 'sub2'}];
    component.removeFilter({type: 'subject', id: 1});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 'sub1'}, {id: 2, name: 'sub2'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '', '2', '');
  });

  it('should update component fields with route parameter data', fakeAsync(() => {
    setAllRoutes(route, '1', '2', '3', '4');
    component.ngOnInit();
    tick();
    expect(route.params.subscribe).toHaveBeenCalled();
    expect(component.areaId).toEqual('1');
    expect(component.subjectId).toEqual('2');
    expect(component.groupId).toEqual('3');
    expect(component.typeId).toEqual('4');
  }));

  it('should update selected filter fields with route parameter data', fakeAsync(() => {
    spyOn(setSelectedService, 'setSelectedArea');
    spyOn(setSelectedService, 'setSelectedSubject');
    spyOn(setSelectedService, 'setSelectedTypes');
    spyOn(setSelectedService, 'setSelectedGroups');
    setAllRoutes(route, '1', '2', '3', '4');
    component.ngOnInit();
    tick();
    expect(route.params.subscribe).toHaveBeenCalled();
    expect(setSelectedService.setSelectedArea).toHaveBeenCalledWith('1');
    expect(setSelectedService.setSelectedSubject).toHaveBeenCalledWith('2');
    expect(setSelectedService.setSelectedGroups).toHaveBeenCalledWith('3');
    expect(setSelectedService.setSelectedTypes).toHaveBeenCalledWith('4');
  }));

  it('should call selected service with null values', fakeAsync(() => {
    spyOn(setSelectedService, 'setSelectedArea');
    spyOn(setSelectedService, 'setSelectedSubject');
    spyOn(setSelectedService, 'setSelectedTypes');
    spyOn(setSelectedService, 'setSelectedGroups');
    setAreaRoute(route, '1');
    component.ngOnInit();
    tick();
    expect(setSelectedService.setSelectedArea).toHaveBeenCalledWith('1');
    expect(setSelectedService.setSelectedSubject).toHaveBeenCalledWith(null);
    expect(setSelectedService.setSelectedGroups).toHaveBeenCalledWith(null);
    expect(setSelectedService.setSelectedTypes).toHaveBeenCalledWith(null);
  }));

  it('should remove the type filter and call updated route', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1,2');
    component.areaId = '1';
    component.selectedTypes = [{id: 1, name: 't1'}, {id: 2, name: 't2'}];
    component.removeFilter({type: 'type', id: 1});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 't1'}, {id: 2, name: 't2'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '2', '', '');
  });

  it('should remove the group filter and call updated route', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1,2');
    component.areaId = '1';
    component.selectedGroups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}];
    component.removeFilter({type: 'group', id: 1});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 'g1'}, {id: 2, name: 'g2'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '', '', '2');
  });

  it('should execute type navigation.', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1');
    component.selectedAreas = [{id: 1, name: 'a1'}];
    component.selectedSubjects = [{id: 1, name: 's1'}];
    component.selectedGroups = [{id: 1, name: 'g1'}];
    component.typeNavigation({selected: [{id: 1, name: 't1'}]});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 't1'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '1', '1', '1');
  });

  it('should execute subject navigation.', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1');
    component.selectedAreas = [{id: 1, name: 'a1'}];
    component.selectedTypes = [{id: 1, name: 's1'}];
    component.selectedGroups = [{id: 1, name: 'g1'}];
    component.subjectNavigation({selected: [{id: 1, name: 's1'}]});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 's1'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '1', '1', '1');
  });

  it('should execute group navigation.', () => {
    spyOn(navigationService, 'navigateRoute');
    spyOn(navigationService, 'getIds').and.returnValue('1');
    component.selectedAreas = [{id: 1, name: 'a1'}];
    component.selectedSubjects = [{id: 1, name: 's1'}];
    component.selectedTypes = [{id: 1, name: 't1'}];
    component.typeNavigation({selected: [{id: 1, name: 'g1'}]});
    expect(navigationService.getIds).toHaveBeenCalledWith([{id: 1, name: 'g1'}]);
    expect(navigationService.navigateRoute).toHaveBeenCalledWith('1', '1', '1', '1');
  });

  it('should navigate to item.', () => {
    spyOn(navigationService, 'navigateItemRoute');
    spyOn(store, 'dispatch');
    component.areaId = '1';
    component.collectionNavigation('1');
    expect(navigationService.navigateItemRoute).toHaveBeenCalledWith('1', '1');
    expect(store.dispatch).toHaveBeenCalledWith(new CollectionReset());
  });
});
