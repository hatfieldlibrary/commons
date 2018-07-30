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
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import * as fromRoot from '../../reducers';
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {fadeIn} from '../../animation/animations';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {DeselectedFilter} from 'app/components/area-filters/area-filters.component';
import {SelectedTypeEvent} from '../../components/types/types.component';
import {SelectedSubjectEvent} from '../../components/subject-options/subject-options.component';
import {DispatchService} from '../../services/dispatch.service';
import {SetSelectedService} from '../../services/set-selected.service';
import {TypesFilter} from '../../shared/data-types/types-filter';
import * as fromFilter from '../../reducers/filter.reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {CollectionReset} from '../../actions/collection.actions';
import {SubjectFilter} from '../../shared/data-types/subject-filter';
import {SelectedGroupEvent} from '../../components/group-options/group-options.component';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';
import {SetViewAction} from '../../actions/view.actions';
import {SelectedAreaEvent} from '../../components/area-options/area-options.component';

@Component({
  selector: 'app-lists-container',
  templateUrl: 'lists-container.component.html',
  styleUrls: ['lists-container.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [fadeIn]
})
export class ListsContainerComponent implements OnInit, OnDestroy {

  state = '';
  view = 'list';

  /**
   * Redux selectors.
   */
  collections$: Observable<CollectionType[]>;
  areas$: Observable<FieldFilterType[]>;
  areaInfo$: Observable<AreaType>;
  types$: Observable<FieldFilterType[]>;
  groups$: Observable<FieldFilterType[]>;
  filters$: Observable<fromFilter.State>;
  typesFilter$: Observable<TypesFilter>;
  areasFilter$: Observable<AreasFilter>;
  subjectsFilter$: Observable<SubjectFilter>;
  groupsFilter$: Observable<CollectionGroupFilter>;
  viewType$: Observable<string>;

  selectedAreas: FieldFilterType[];
  selectedTypes: FieldFilterType[];
  selectedSubjects: FieldFilterType[];
  selectedGroups: FieldFilterType[];

  /**
   * These member variables contain route parameters.
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
   * since we do not have a global view).
   */
  areaScreen: boolean;

  notMobile = true;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              public media: ObservableMedia,
              private navigation: NavigationServiceB,
              private setSelected: SetSelectedService,
              private dispatchService: DispatchService,
              private scrollReady: ScrollReadyService) {

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

    console.log('remove filter')

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
    console.log(this.typeId)
    console.log(this.subjectId)
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
   * Navigates to new location when area area is updated.
   * @param {SelectedAreaEvent} updatedAreaList the updated area list
   */
  areaNavigation(updatedAreaList: SelectedAreaEvent) {

    const areaIds = this.navigation.getIds(updatedAreaList.selected);
    this.navigation.navigateRoute(areaIds, null, null, null);
  }

  /**
   * Navigates to new location when the TypesComponent is updated.
   * @param {SelectedTypeEvent} updatedTypeList the updated area list
   */
  typeNavigation(updatedTypeList: SelectedTypeEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(updatedTypeList.selected);
    const subjectIds = this.navigation.getIds(this.selectedSubjects);
    const groupIds = this.navigation.getIds(this.selectedGroups);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds);
  }

  subjectNavigation(updatedSubjectList: SelectedSubjectEvent) {
    const areaIds = this.navigation.getIds(this.selectedAreas);
    const typeIds = this.navigation.getIds(this.selectedTypes);
    const groupIds = this.navigation.getIds(this.selectedGroups);
    const subjectIds = this.navigation.getIds(updatedSubjectList.selected);
    this.navigation.navigateRoute(areaIds, typeIds, subjectIds, groupIds);
  }

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

  ngOnInit() {
    // All local subscriptions are added to this Subscription
    // and removed in ngOnDestroy.
    this.watchers = new Subscription();
    this.setMediaWatcher();
    this.collections$ = Observable.combineLatest(
      this.store.select(fromRoot.getFilteredCollections),
      (collections) => {
        // Let subscribers know that collection data is ready.
        // TODO: may be possible to instead use AfterViewInit inside CollectionRowsComponent and CollectionGridComponent.
        this.scrollReady.setReady();
        return collections;
      }
    );
    // For now, areas$ is used in app menu.
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
    // this.types$ = this.store.select(fromRoot.getTypes);
    // this.groups$ = this.store.select(fromRoot.getCollectionGroups);
    this.filters$ = this.store.select(fromRoot.getFilters);
    this.viewType$ = this.store.select(fromRoot.getViewState);
    this.areasFilter$ = Observable.combineLatest(
      this.store.select(fromRoot.getAreas),
      this.store.select(fromRoot.getAreasFilter),
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
    this.subjectsFilter$ = Observable.combineLatest(
      this.store.select(fromRoot.getSubject),
      this.store.select(fromRoot.getSubjectsFilter),
      (subjects, selected) => {
        this.selectedSubjects = selected;
        return {
          subjects: subjects,
          selectedSubjects: selected
        }
      }
    );
    this.groupsFilter$ = Observable.combineLatest(
      this.store.select(fromRoot.getCollectionGroups),
      this.store.select(fromRoot.getCollectionsGroupFilter),
      (groups, selected) => {
        this.selectedGroups = selected;
        return {
          groups: groups,
          selectedGroups: selected
        }
      }
    );
    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.setQueryParams(params);
        this.updateSelected(params);
        this.initializeAreas();
        this.areaScreen = this.navigation.isFieldSelected(params['areaId']);
        this.dispatchService.dispatchActions(
          params['areaId'],
          params['typeId'],
          params['subjectId'],
          params['categoryId']);
      });
    this.watchers.add(routeWatcher);
    const paramsWatcher = this.route.queryParams
      .subscribe(params => {
        this.setView(params);
      });
    this.watchers.add(paramsWatcher);
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

