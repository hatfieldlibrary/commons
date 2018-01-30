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
 * The main container component for subject selector, areas selector and collection
 * list components
 */
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {fadeIn} from '../../animation/animations';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {NavigationService} from '../../services/navigation/navigation.service';
import {DeselectedFilter} from 'app/components/current-filters/current-filters.component';
import {SelectedAreaEvent} from '../../components/area-selector/area.component';
import {SelectedTypeEvent} from '../../components/types/types.component';
import {SelectedSubjectEvent} from '../../components/subject-selector/subjects.component';
import {DispatchService} from '../../services/dispatch.service';
import {SetSelectedService} from '../../services/set-selected.service';


@Component({
  selector: 'app-lists-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lists-container.component.html',
  styleUrls: ['lists-container.component.css'],
  animations: [fadeIn]
})
export class ListsContainerComponent implements OnInit, OnDestroy {

  title: string;
  subtitle: string;
  state = '';
  /**
   * Redux selectors.
   */
  collections$: Observable<CollectionType[]>;
  subjects$: Observable<SubjectType[]>;
  selectedSubject$: Observable<SubjectType>;
  selectedAreas$: Observable<AreaFilterType[]>;
  selectedTypes$: Observable<TypesFilterType[]>;
  areas$: Observable<AreaFilterType[]>;
  areaInfo$: Observable<AreaType[]>;
  types$: Observable<TypesFilterType[]>;
  /**
   * These member variables contain the route parameters.
   */
  areaId: string;
  typeId: string;
  subjectId: string;
  /**
   * Used to clean up subscriptions OnDestroy.
   */
  watchers: Subscription;
  /**
   * Boolean value determines whether to show the area information
   * component or the default home information.
   */
  areaScreen: boolean;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              public media: ObservableMedia,
              private navigation: NavigationService,
              private setSelected: SetSelectedService,
              private dispatchService: DispatchService) {

  }

  /**
   * Dispatches action for areas list if not currently available in the store.
   * @param id
   */
  private initializeAreas(params: any) {
    if (this.navigation.isTypeSelected(params['typeId']) && this.navigation.isSubjectSelected(params['subjectId'])) {
      this.dispatchService.getAreasByTypeAndSubject(params['typeId'], params['subjectId']);
    } else if (this.navigation.isSubjectSelected(params['subjectId'])) {
      this.dispatchService.getAreasBySubject(params['subjectId']);
    } else if (this.navigation.isTypeSelected(params['typeId'])) {
      this.dispatchService.getAreasByType(params['typeId']);
    } else {
      this.dispatchService.getAllAreas();
    }
  }

  /**
   * This function used by ListComponent event binding to update the collection list
   * whenever a subject has been deselected.
   */
  subjectNavigation(subjectEventPayload: SelectedSubjectEvent): void {
    this.navigation.navigateFilterRoute(this.areaId, this.typeId, subjectEventPayload.selected.id.toString());
  }

  /**
   * Function used by CurrentFilters component event binding to update the collection list
   * whenever an area or type filter is removed.
   * @param areaId the area id
   * @param typeId the type id
   */
  removeFilter(deselected: DeselectedFilter): void {
    const test = deselected.id + '[^0-9]*';
    const regex = new RegExp(test);
    if (deselected.type === 'area') {
      this.areaId = this.areaId.replace(regex, '');
    } else {
      this.typeId = this.typeId.replace(regex, '');
    }
    this.navigation.navigateFilterRoute(this.areaId, this.typeId, this.subjectId);
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
  }

  private setMediaWatcher(): void {
    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ''
      });
    this.watchers.add(mediaWatcher);
  }

  collectionNavigation(id: string): void {
    this.navigation.navigateItemRoute(id, this.areaId);
  }

  /**
   * Navigates to new location when area NavigationComponent is updated. This function is
   * the callback provided to the component's Output() event binding.
   * @param {SelectedAreaEvent} updatedAreaList the updated area list
   */
  areaNavigation(updatedAreaList: SelectedAreaEvent) {
    const areaIds = this.navigation.getIds(updatedAreaList.selected);
    this.navigation.navigateFilterRoute(areaIds, this.typeId, this.subjectId);
  }

  /**
   * Navigates to new location when the TypesComponent is updated. This function is
   * the callback provided to the component's Output() event binding.
   * @param {SelectedTypeEvent} updatedTypeList the updated area list
   */
  typeNavigation(updatedTypeList: SelectedTypeEvent) {
    const typeIds = this.navigation.getIds(updatedTypeList.selected);
    this.navigation.navigateFilterRoute(this.areaId, typeIds, this.subjectId);
  }

  ngOnInit() {
    // All subscriptions are added to this Subscription so
    // the can be removed in ngOnDestroy.
    this.watchers = new Subscription();

    this.setMediaWatcher();
    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.subjects$ = this.store.select(fromRoot.getSubject);
        this.collections$ = this.store.select(fromRoot.getFilteredCollections);
        this.areas$ = this.store.select(fromRoot.getAreas);
        this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
        this.types$ = this.store.select(fromRoot.getTypes);
        this.selectedSubject$ = this.store.select(fromRoot.getSubjectsFilter);
        this.selectedAreas$ = this.store.select(fromRoot.getAreasFilter);
        this.selectedTypes$ = this.store.select(fromRoot.getTypesFilter);
        this.setQueryParams(params);
        this.updateSelected(params);
        this.initializeAreas(params);
        this.areaScreen = this.navigation.isAreaSelected(params['areaId']);
        this.dispatchService.dispatchActions(params['areaId'], params['typeId'], params['subjectId']);
      });

    this.watchers.add(routeWatcher);
  }

  ngOnDestroy(): void {
    if (this.watchers) {
      // Unsubscribe local watchers.
      this.watchers.unsubscribe();
    }
    // Unsubscribe all watchers in the service. Each component
    // instance will resubscribe. The prevents the multiple
    // subscriptions within the service.
    this.setSelected.unsubscribe();
  }

}

