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
 * The main container for components used in browsing with filters.
 */
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy, Inject, PLATFORM_ID
} from '@angular/core';
import * as fromRoot from '../../../core/ngrx/reducers/index';
import {AreaType} from '../../../core/data-types/area.type';
import {CollectionType} from '../../../core/data-types/collection.type';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {SelectedTypeEvent} from '../types/types.component';
import {SelectedSubjectEvent} from '../subject-options/subject-options.component';
import {DispatchService} from '../../../core/services/dispatch.service';
import {SetSelectedService} from '../../../core/services/set-selected.service';
import {TypesFilter} from '../../../core/data-types/types-filter';
import * as fromFilter from '../../../core/ngrx/reducers/filter.reducers';


import {AreasFilter} from '../../../core/data-types/areas-filter';
import {SubjectFilter} from '../../../core/data-types/subject-filter';
import {SelectedGroupEvent} from '../group-options/group-options.component';
import {CollectionGroupFilter} from '../../../core/data-types/collection-group-filter';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';
import {ScrollReadyService} from '../../../core/services/observable/scroll-ready.service';
import {SetViewAction} from '../../../core/ngrx/actions/view.actions';
import {SelectedAreaEvent} from '../area-options/area-options.component';
import {SubscriptionService} from '../../../core/services/subscription.service';
import {DeselectedFilter} from '../area-filters/area-filters.component';
import {Meta, Title, TransferState} from '@angular/platform-browser';

@Component({
  selector: 'app-collection-view',
  templateUrl: 'collection-view.component.html',
  styleUrls: ['collection-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CollectionViewComponent implements OnInit, OnDestroy {

  state = '';
  view: string;

  /**
   * State observables.
   */
  collections$: Observable<CollectionType[]>;
  areas$: Observable<FieldFilterType[]>;
  areaInfo$: Observable<AreaType>;
  filters$: Observable<fromFilter.State>;
  typesFilter$: Observable<TypesFilter>;
  areasFilter$: Observable<AreasFilter>;
  subjectsFilter$: Observable<SubjectFilter>;
  groupsFilter$: Observable<CollectionGroupFilter>;
  viewType$: Observable<string>;
  /**
   * Used in navigation. The values are
   * set by subscription to Store observables.
   */
  selectedAreas: FieldFilterType[];
  selectedTypes: FieldFilterType[];
  selectedSubjects: FieldFilterType[];
  selectedGroups: FieldFilterType[];
  /**
   * These member variables contain the route parameters.
   */
  areaId = '';
  typeId = '';
  subjectId = '';
  groupId = '';
  /**
   * Used to clean up subscriptions in OnDestroy.
   */
  watchers: Subscription;
  /**
   * Boolean value determines whether to show the area information
   * component or the default home information. (Currently not relevant,
   * since we do not have a global "home" view. Retaining in case
   * that changes.) Value will be true in call current navigation cases.
   */
  areaScreen: boolean;

  notMobile = true;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              public media: ObservableMedia,
              private navigation: NavigationServiceB,
              private setSelected: SetSelectedService,
              private dispatchService: DispatchService,
              private scrollReady: ScrollReadyService,
              private titleService: Title,
              private metaService: Meta,
              private subscriptionService: SubscriptionService) {

  }

  private initializeAreas() {
    this.dispatchService.getAllAreas();
  }

  /**
   * Deselect filter callback for group, types and subjects. This filter
   * modifies the currently selected ids and calls router navigation.
   * @param {DeselectedFilter} deselected field
   */
  removeFilter(deselected: DeselectedFilter): void {

    const test = deselected.id + '[^0-9]*';
    const regex = new RegExp(test);

    switch (deselected.type) {
      case 'type': {
        const typeIds = this.navigation.getIds(this.selectedTypes);
        this.typeId = typeIds.replace(regex, '');
        break;
      }
      case 'subject': {
        const subjectIds = this.navigation.getIds(this.selectedSubjects);
        this.subjectId = subjectIds.replace(regex, '');
        break;
      }
      case 'group': {
        const groupIds = this.navigation.getIds(this.selectedGroups);
        this.groupId = groupIds.replace(regex, '');
        break;
      }
      default: {
        console.log('type not recognized.');
      }
    }
    this.navigation.navigateRoute(this.areaId, this.typeId, this.subjectId, this.groupId);
  }

  /**
   * Sets the local query parameter fields.
   * @param params
   */
  private setQueryParams(params: any): void {
    if (params['areaId']) {
      this.areaId = params['areaId'];
    }
    if (params['subjectId']) {
      this.subjectId = params['subjectId'];
    }
    if (params['typeId']) {
      this.typeId = params['typeId'];
    }
    if (params['categoryId']) {
      this.groupId = params['categoryId'];
    }
  }

  /**
   * Updates the selected filters based on the current route query parameters.
   * @param params query parameters
   */
  private updateSelected(params: any): void {
    if (params['areaId']) {
      this.setSelected.setSelectedArea(params['areaId']);
    } else {
      this.setSelected.setSelectedArea(null);
    }
    if (params['subjectId']) {
      this.setSelected.setSelectedSubject(params['subjectId']);
    } else {
      this.setSelected.setSelectedSubject(null);
    }
    if (params['typeId']) {
      this.setSelected.setSelectedTypes(params['typeId']);
    } else {
      this.setSelected.setSelectedTypes(null);
    }
    if (params['categoryId']) {
      this.setSelected.setSelectedGroups(params['categoryId']);
    } else {
      this.setSelected.setSelectedGroups(null);
    }
  }

  private setMediaWatcher(): void {
    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        this.notMobile = change.mqAlias !== 'xs';
        // Toggle to grid view if mobile.
        // if (change.mqAlias === 'xs') {
        //   this.store.dispatch(new SetViewAction('grid'));
        // }
      });
    this.watchers.add(mediaWatcher);
  }

  /**
   * Navigates to item when the collections component fires the event.
   * @param {string} id
   */
  collectionNavigation(id: string): void {
    //  this.store.dispatch(new CollectionReset());
    this.navigation.navigateItemRoute(id);
  }

  /**
   * Navigates to new location when area selection component fires the event.
   * @param {SelectedAreaEvent} updatedAreaList the updated area list
   */
  areaNavigation(updatedAreaList: SelectedAreaEvent) {
    const areaIds = this.navigation.getIds(updatedAreaList.selected);
    this.navigation.navigateRoute(areaIds, null, null, null);
  }

  /**
   * Navigates to new location when content type selection component fires the event.
   * @param {SelectedTypeEvent} updatedTypeList the updated area list
   */
  typeNavigation(updatedTypeList: SelectedTypeEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(updatedTypeList.selected);
    const subjectIds = this.navigation.getIds(this.selectedSubjects);
    const groupIds = this.navigation.getIds(this.selectedGroups);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds);
  }

  /**
   * Navigates to new location when subject selection component fires the event.
   * @param {SelectedSubjectEvent} updatedSubjectList
   */
  subjectNavigation(updatedSubjectList: SelectedSubjectEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(this.selectedTypes);
    const groupIds = this.navigation.getIds(this.selectedGroups);
    const subjectIds = this.navigation.getIds(updatedSubjectList.selected);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds);
  }

  /**
   * Navigates to new location when GroupOptionsComponent fires the event.
   * @param {SelectedGroupEvent} updatedGroupList
   */
  groupNavigation(updatedGroupList: SelectedGroupEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(this.selectedTypes);
    const subjectIds = this.navigation.getIds(this.selectedSubjects);
    const groupIds = this.navigation.getIds(updatedGroupList.selected);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds);
  }

  /**
   * This function handles the set view event, setting the store and
   * navigating to the selected view.
   * @param {string} type
   */
  setViewType(type: string): void {
    this.scrollReady.setPosition(0);
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(this.selectedTypes);
    const subjectIds = this.navigation.getIds(this.selectedSubjects);
    const groupIds = this.navigation.getIds(this.selectedGroups);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds, type);
  }

  /**
   * This function uses queryParams to set the state of the view (list or grid).
   * The purpose is to allow deep linking by using the route to update store.
   * @param queryParams
   */
  setView(queryParams: any): void {
    if (queryParams.view) {
      this.store.dispatch(new SetViewAction(queryParams.view));
    }
  }

  /**
   * Gets Store observables from the SubscriptionService and adds
   * subscriptions to update local, bound fields. Local subscriptions
   * are added to the watcher for later cleanup.
   */
  private getStoreSelectors(): void {
    // For now, areas$ is used in app menu.
    this.areas$ = this.subscriptionService.getAreasState();
    this.collections$ = this.subscriptionService.getCollectionState();
    const readySubscription = this.collections$.subscribe(() => {
      this.scrollReady.setReady();
    });
    this.watchers.add(readySubscription);
    this.areaInfo$ = this.subscriptionService.getAreaInfoState();
    const areaInfoSub = this.areaInfo$.subscribe(area => {
      this.titleService.setTitle(area.title);
      if (area.description) {
        this.metaService.removeTag('name="Description"');
        this.metaService.addTag({name: 'Description', content: area.description});
      }
    });
    this.watchers.add(areaInfoSub);
    this.filters$ = this.subscriptionService.getFilterState();
    this.viewType$ = this.subscriptionService.getViewTypeState();
    this.areasFilter$ = this.subscriptionService.getAreasFilterState();
    const areaFilterSub = this.areasFilter$.subscribe((area) => {
      this.selectedAreas = area.selectedAreas;
    });
    this.watchers.add(areaFilterSub);
    this.typesFilter$ = this.subscriptionService.getTypesFilterState();
    const typeFilterSub = this.typesFilter$.subscribe((type) => {
      this.selectedTypes = type.selectedTypes;
    });
    this.watchers.add(typeFilterSub);
    this.subjectsFilter$ = this.subscriptionService.getSubjectsFilterState();
    const subjectFilterSub = this.subjectsFilter$.subscribe((subject) => {
      this.selectedSubjects = subject.selectedSubjects;
    });
    this.watchers.add(subjectFilterSub);
    this.groupsFilter$ = this.subscriptionService.getGroupsFilterState();
    const groupFilterSub = this.groupsFilter$.subscribe((group) => {
      this.selectedGroups = group.selectedGroups;
    });
    this.watchers.add(groupFilterSub);
  }

  /**
   * Due to how filter routes are applied, some filter updates will use the same route.
   * In that situation, the existing component instance is used and detecting
   * filter updates requires a subscription to the route params observable.
   * Because of that, the route params subscription is used to trigger all updates.
   */
  private setRouteWatchers(): void {
    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.setQueryParams(params);
        this.updateSelected(params);
        this.initializeAreas();
        this.areaScreen = this.navigation.isFieldSelected(params['areaId']);
        // This guards against dispatching a new request for data that
        // is already present in the store. This navigation function
        // returns true if (a) called for the first time, or (b) the
        // previous navigation event was not an item route.
        if (this.navigation.shouldFetchCollectionData()) {
          this.dispatchService.dispatchActions(
            params['areaId'],
            params['typeId'],
            params['subjectId'],
            params['categoryId']);
        }
      });
    this.watchers.add(routeWatcher);
    const paramsWatcher = this.route.queryParams
      .subscribe(params => {
        this.setView(params);
      });
    this.watchers.add(paramsWatcher);
  }

  ngOnInit() {
    // All subscriptions are added to this Subscription and removed in ngOnDestroy.
    this.watchers = new Subscription();
    this.setMediaWatcher();
    this.getStoreSelectors();
    this.setRouteWatchers();
  }

  ngOnDestroy(): void {
    if (this.watchers) {
      // Unsubscribe local watchers.
      this.watchers.unsubscribe();
    }
    // Unsubscribe watchers in the setSelected service.
    this.setSelected.unsubscribe();
  }

}

