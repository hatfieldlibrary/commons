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
 * The main container component for subject selector, areas/types selectors and collection
 * list components
 */
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, AfterViewInit} from '@angular/core';
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
import {TypesFilter} from '../../shared/data-types/types-filter';
import * as fromFilter from '../../reducers/filter.reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {AreaDefaultList} from '../../actions/area.actions';
import {ClearCollectionsFilter, CollectionReset} from '../../actions/collection.actions';

@Component({
  selector: 'app-lists-container',
  templateUrl: 'lists-container.component.html',
  styleUrls: ['lists-container.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [fadeIn]
})
export class ListsContainerComponent implements OnInit, OnDestroy {

  title: string;
  subtitle: string;
  state = '';
  toolTipPosition = 'below';
  /**
   * Redux selectors.
   */
  collections$: Observable<CollectionType[]>;
  subjects$: Observable<SubjectType[]>;
  selectedSubject$: Observable<SubjectType>;
  areas$: Observable<AreaFilterType[]>;
  areaInfo$: Observable<AreaType[]>;
  types$: Observable<TypesFilterType[]>;
  filters$: Observable<fromFilter.State>;
  typesFilter$: Observable<TypesFilter>;
  areasFilter$: Observable<AreasFilter>;
  selectedAreas: AreaFilterType[];
  selectedTypes: TypesFilterType[];
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
   * Event binding callback to update the collection list
   * when a subject is deselected.
   */
  subjectNavigation(subjectEventPayload: SelectedSubjectEvent): void {
    this.navigation.navigateFilterRoute(this.areaId, this.typeId, subjectEventPayload.selected.id.toString());
  }

  /**
   * Deselect filter callback for areas and types. This filter
   * uses the currently selected areas and types to assure correct
   * state across filter changes.
   * @param {DeselectedFilter} deselected
   */
  removeFilter(deselected: DeselectedFilter): void {
    const test = deselected.id + '[^0-9]*';
    const regex = new RegExp(test);
    if (deselected.type === 'area') {
      // Get url query parameter for current areas.
      const areaIds = this.navigation.getIds(this.selectedAreas);

      this.areaId = areaIds.replace(regex, '');
      if (this.selectedTypes) {
        this.typeId = this.navigation.getIds(this.selectedTypes);
      }
    } else {
      // Get url query parameter for current types.
      const typeIds = this.navigation.getIds(this.selectedTypes);
      this.typeId = typeIds.replace(regex, '');
      this.areaId = this.navigation.getIds(this.selectedAreas);
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

  /**
   * Event binding callback for navigation to an item.
   * @param {string} id
   */
  collectionNavigation(id: string): void {
    this.store.dispatch(new CollectionReset());
    this.navigation.navigateItemRoute(id, this.areaId);
  }

  /**
   * Navigates to new location when area NavigationComponent is updated.
   * @param {SelectedAreaEvent} updatedAreaList the updated area list
   */
  areaNavigation(updatedAreaList: SelectedAreaEvent) {
    const areaIds = this.navigation.getIds(updatedAreaList.selected);
    this.navigation.navigateFilterRoute(areaIds, this.typeId, this.subjectId);
  }

  /**
   * Navigates to new location when the TypesComponent is updated.
   * @param {SelectedTypeEvent} updatedTypeList the updated area list
   */
  typeNavigation(updatedTypeList: SelectedTypeEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(updatedTypeList.selected);
    this.navigation.navigateFilterRoute(areaIds, typeIds, this.subjectId);
  }

  ngOnInit() {
    // All local subscriptions are added to this Subscription
    // and removed in ngOnDestroy.
    this.watchers = new Subscription();
    this.setMediaWatcher();
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.collections$ = this.store.select(fromRoot.getFilteredCollections);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
    this.types$ = this.store.select(fromRoot.getTypes);
    this.selectedSubject$ = this.store.select(fromRoot.getSubjectsFilter);
    this.filters$ = this.store.select(fromRoot.getFilters);
    const areaList = this.store.select(fromRoot.getAreas);
    const areaFilters = this.store.select(fromRoot.getAreasFilter);
    areaFilters.subscribe(filter => {
      this.selectedAreas = filter;
    });
    this.areasFilter$ = Observable.combineLatest(
      areaList,
      areaFilters,
      (areas, selected) => {
        this.selectedAreas = selected;
        return {
          areas: areas,
          selectedAreas: selected
        }
      }
    );
    this.typesFilter$ = Observable.combineLatest(
      this.store.select(fromRoot.getTypes),
      this.store.select(fromRoot.getTypesFilter),
      (types, selected) => {
        this.selectedTypes = selected;
        return {
          types: types,
          selectedTypes: selected
        }
      }
    );
    const routeWatcher = this.route.params
      .subscribe((params) => {
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

