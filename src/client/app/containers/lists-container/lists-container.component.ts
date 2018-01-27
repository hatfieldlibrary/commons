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
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectAction from '../../actions/subject-actions';
import * as typeActions from '../../actions/type.actions';
import * as filterActions from '../../actions/filter.actions';
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {fadeIn} from '../../animation/animations';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {AreaSubjectParams} from '../../actions/area-subject-parameters.interface';
import {TypeAreaSubjectParams} from '../../actions/type-area-subject-parameters.interface';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {AreaParams} from '../../actions/area.actions';
import {NavigationService} from '../../services/navigation/navigation.service';
import {DeselectedFilter} from 'app/components/current-filters/current-filters.component';


@Component({
  selector: 'app-lists-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lists-container.component.html',
  styleUrls: ['lists-container.component.css'],
  animations: [fadeIn]
})
export class ListsContainerComponent implements OnInit, OnDestroy {

  collections$: Observable<CollectionType[]>;
  subjects$: Observable<SubjectType[]>;
  selectedSubject$: Observable<SubjectType>;
  selectedAreas$: Observable<AreaFilterType[]>;
  selectedTypes$: Observable<TypesFilterType[]>;
  areas$: Observable<AreaFilterType[]>;
  areaInfo$: Observable<AreaType[]>;
  types$: Observable<TypesFilterType[]>;
  areaId: string;
  homeScreen: boolean;
  title: string;
  subtitle: string;
  subjectId: string;
  filterTerm = '';
  state = '';
  watchers: Subscription;
  typeId: string;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private router: Router,
              public media: ObservableMedia,
              private navigation: NavigationService) {

  }

  private setAllCollectionTitle() {
    this.title = 'All Collections';
  }

  // are these being used...what is the purpose.
  private setItemTitle(): void {
    const areaInfoWatcher = this.store.select(fromRoot.getAreaInfo).subscribe((info) => {
      // Clear the item and subtitle labels before proceeding.
      this.title = '';
      this.subtitle = '';
      if (info.length > 0) {
        // If the local areaId field is set to '0' then just use
        // the default title.
        if (info[0].id === 0) {
          this.setAllCollectionTitle();
        } else if (info.length > 1) {
          // Use subtitle for multiple collection names
          // Multiple areas selected, use subtitle format for multiple areas info.
          info.forEach((area) => this.subtitle += area.title + ' / ');
          this.subtitle = this.subtitle.substring(0, this.subtitle.length - 2);
        } else if (info[0].title.length > 0) {
          // Otherwise update the title using the new single areas information.
          this.title = info[0].title;
        } else {   // Default.
          this.setAllCollectionTitle();
        }
      }
    });
    this.watchers.add(areaInfoWatcher);
  }

  private getAllAreas(): void {
    this.store.dispatch(new areaActions.AreaListAction());
  }

  private getAreasByType(typeId: string): void {
    this.store.dispatch(new areaActions.AreaListByType(typeId))
  }

  private getAreasBySubject(subjectId: string): void {
    this.store.dispatch(new areaActions.AreaListBySubject(subjectId));
  }

  private getAreasByTypeAndSubject(typeId: string, subjectId: string): void {
    const parameters: AreaParams = {typeId: typeId, subjectId: subjectId};
    this.store.dispatch(new areaActions.AreaListByTypeSubject(parameters));
  }

  /**
   * Dispatches action for areas information and for list of
   * subjects assigned to the areas..
   * @param areaId
   */
  private getAreaInformation(areaId: string): void {
    this.store.dispatch(new areaActions.AreaInformation(areaId));
  }


  /**
   * Dispatches action for collections by subject and areas.
   * @param subjectId
   * @param areaId
   */
  private getCollectionsForSubject(subjectId: string): void {
    this.store.dispatch(new listActions.CollectionsSubjectAction(subjectId));
  }

  private getCollectionsForAreaSubject(areaId: string, subjectId: string): void {
    this.store.dispatch(new listActions.CollectionsAreaSubjectAction(areaId, subjectId));
  }

  /**
   * Dispatches action for collections in an areas.
   * @param areaId
   */
  private getCollectionsForArea(areaId: string): void {
    this.store.dispatch(new listActions.CollectionsAreaAction(areaId));
  }

  /**
   * Dispatches action to fetch all collections.
   */
  private getAllCollections(): void {
    this.title = 'All Collections';
    this.store.dispatch(new listActions.AllCollectionsAction());
  }

  private getCollectionsForType(typeId: string): void {
    this.store.dispatch(new listActions.CollectionsTypeAction(typeId));
  }

  private getCollectionsForTypeSubject(typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: [],
      types: typeId.split(','),
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeSubjectAction(params));
  }

  private getCollectionsForTypeAreaSubject(areaId: string, typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaSubjectAction(params));
  }

  private getCollectionsForAreaType(areaId: string, typeId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: ''
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaAction(params));
  }

  /**
   * Dispatches action to set the selected subject after the subject list subscription
   * tells us that subjects are available.
   * @param {string} subjectId
   * @private
   */
  private setSelectedSubject(subjectId: string): void {
    const subjectsWatcher = this.selectedSubject$.subscribe(() => {
      this.store.dispatch(new subjectAction.CurrentSubject(subjectId));
    });
    this.watchers.add(subjectsWatcher);

  }

  /**
   * Adds a watcher for the area list. The callback function uses the provided areaId
   * to create an array of selected areas from the current list of areas. The selected
   * areas are dispatched to the store. This initializes the selected areas on page load.
   *
   * @param {string} areaId comma separated string of area ids.
   */
  private setSelectedArea(areaId: string): void {
    console.log(areaId)
    if (areaId) {
      const areasWatcher = this.areas$.subscribe((areas) => {
        const areaArr = areaId.split(',');
        const selectedAreas: AreaFilterType[] = [];
        areaArr.forEach(function (singleAreaId) {
          console.log(singleAreaId)
          const selected = areas.find((area) => area.id === +singleAreaId);
          console.log(selected)
          if (selected) {
            selectedAreas.push(selected);
          }
        });
        console.log(selectedAreas)
        if (selectedAreas.length > 0) {
          console.log(selectedAreas)
          this.store.dispatch(new filterActions.SetAreaFilter(selectedAreas));
        } else {
          this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, title: '', count: 0}]));
        }
      });
      this.watchers.add(areasWatcher);
    } else {
      this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, title: '', count: 0}]))
    }
  }

  /**
   * Adds a watcher for the type list. The callback function uses the provided typeId
   * to create an array of selected types from the current list of types. The selected
   * types are dispatched to the store. This initializes the selected types on page load.
   *
   * @param {string} typeId comma separated string of area ids.
   */
  private setSelectedTypes(typeId: string): void {
    if (typeId) {
      const typesWatcher = this.types$.subscribe((types) => {
        const areaArr = typeId.split(',');
        const selectedTypes: TypesFilterType[] = [];
        areaArr.forEach(function (singleTypeId) {
          const selected = types.find((type) => type.id === +singleTypeId);
          if (selected) {
            selectedTypes.push(selected);
          }
        });
        if (selectedTypes.length > 0) {
          this.store.dispatch(new filterActions.SetTypeFilter(selectedTypes));
        }
      });
      this.watchers.add(typesWatcher);
    } else {
      this.store.dispatch(new filterActions.SetTypeFilter([{id: 0, name: ''}]))
    }
  }

  private getAllSubjects(): void {
    this.store.dispatch(new subjectAction.AllSubjectAction());
  }

  private getSubjectsForArea(areaId: string): void {
    this.store.dispatch((new subjectAction.SubjectAction((areaId))));
  }

  private getSubjectsForType(typeId: string): void {
    this.store.dispatch(new subjectAction.SubjectsForTypes(typeId));
  }

  private getSubjectsForAreaType(areaId: string, typeId: string): void {
    this.store.dispatch(new subjectAction.SubjectsForAreaTypes(areaId, typeId));
  }

  private getAllTypes() {
    this.store.dispatch(new typeActions.ContentTypesAllAction());
  }

  private getTypesForArea(areaId) {
    this.store.dispatch(new typeActions.ContentTypesAreaAction(areaId));
  }

  private getTypesForSubject(subjectId) {
    this.store.dispatch(new typeActions.ContentTypesSubjectAction(subjectId));
  }

  private getTypesForAreaSubject(areaId: string, subjectId: string) {
    const areaIds: Array<string> = areaId.split(',');
    const requestParams: AreaSubjectParams = {areas: areaIds, subject: subjectId};
    this.store.dispatch(new typeActions.ContentTypesAreaSubjectAction(requestParams));
  }

  private isAreaSelected(): boolean {
    return this.areaId && this.areaId !== '0';
  }

  private isTypeSelected(): boolean {
    return (typeof this.typeId !== 'undefined' && this.typeId.length > 0 && this.typeId !== '0');
  }

  private isSubjectSelected(): boolean {
    return (typeof this.subjectId !== 'undefined' && this.subjectId !== '0');
  }

  /**
   * Dispatches action for areas list if not currently available in the store.
   * @param id
   */
  private initializeAreas(params: any) {
    if (this.isTypeSelected() && this.isSubjectSelected()) {
      this.getAreasByTypeAndSubject(params['typeId'], params['subjectId']);
    } else if (this.isSubjectSelected()) {
      this.getAreasBySubject(params['subjectId']);
    } else if (this.isTypeSelected()) {
      this.getAreasByType(params['typeId']);
    } else {
      this.getAllAreas();
    }
  }

  /**
   * This function used by ListComponent event binding to update the collection list
   * whenever a subject has been deselected.
   */
  removeSubject(): void {
    if (this.isAreaSelected() && this.isTypeSelected()) {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId + '/type/' + this.typeId);
    } else if (this.isAreaSelected()) {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId);
    } else {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection');
    }
    this.store.dispatch(new subjectAction.RemoveCurrentSubject());
  }

  /**
   * Function used by CurrentFilters component event binding to update the collection list
   * whenever an area or type filter is removed.
   * @param areaId the area id
   * @param typeId the type id
   */
  removeFilter(deselected: DeselectedFilter): void {
    const test = deselected.id + '[^0-9]*';
    console.log(test);
    const regex = new RegExp(test);
    if (deselected.type === 'area') {
        this.areaId = this.areaId.replace(regex, '');
    } else {
      this.typeId = this.typeId.replace(regex, '');
    }
    console.log(typeof this.areaId)
    this.navigation.navigateRoute(this.areaId, this.typeId, this.subjectId);
  }

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

  private setWatchers(params: any): void {
    if (params['areaId']) {
      this.setSelectedArea(params['areaId']);
    } else {
      this.setSelectedArea(null);
    }
    if (params['subjectId']) {
      this.setSelectedSubject(params['subjectId']);
    } else {
      this.setSelectedSubject(null);
    }
    if (params['typeId']) {
      this.setSelectedTypes(params['typeId']);
    } else {
      this.setSelectedTypes(null);
    }
  }

  private setMediaWatcher(): void {
    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ''
      });
    this.watchers.add(mediaWatcher);
  }

  private dispatchActions(): void {
    if (this.areaId) {
      this.getAreaInformation(this.areaId);
      if (this.subjectId) {
        if (this.typeId) {
          this.getCollectionsForTypeAreaSubject(this.areaId, this.typeId, this.subjectId);
          this.getSubjectsForAreaType(this.areaId, this.typeId);
        } else {
          this.getCollectionsForAreaSubject(this.areaId, this.subjectId);
          this.getSubjectsForArea(this.areaId);
        }
        this.getTypesForAreaSubject(this.areaId, this.subjectId);
      } else {
        if (this.typeId) {
          this.getCollectionsForAreaType(this.areaId, this.typeId);
          this.getSubjectsForAreaType(this.areaId, this.typeId);
        } else {
          this.getCollectionsForArea(this.areaId);
          this.getSubjectsForArea(this.areaId);
        }
        this.getTypesForArea(this.areaId);
      }
    } else if (this.subjectId) {
      this.homeScreen = true;
      if (this.typeId) {
        this.getCollectionsForTypeSubject(this.typeId, this.subjectId);
        this.getSubjectsForType(this.typeId);
      } else {
        this.getCollectionsForSubject(this.subjectId);
        this.getAllSubjects();
      }
      this.setAllCollectionTitle();
      this.getTypesForSubject(this.subjectId);
      this.areaId = '0';
    } else {
      this.areaId = '0';
      if (this.typeId) {
        this.getCollectionsForType(this.typeId);
        this.getSubjectsForType(this.typeId);
      } else {
        this.getAllCollections();
        this.getAllSubjects();
      }
      this.getAllTypes();
      this.homeScreen = true;
    }
  }

  ngOnInit() {

    // All subscriptions are added to this Subscription so
    // the can be removed in ngOnDestroy.
    this.watchers = new Subscription();
    // this.setItemTitle();

    this.setMediaWatcher();
    const routeWatcher = this.route.params
      .subscribe((params) => {
      console.log(params)
        this.subjects$ = this.store.select(fromRoot.getSubject);
        this.collections$ = this.store.select(fromRoot.getFilteredCollections);
        this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
        this.areas$ = this.store.select(fromRoot.getAreas);
        this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
        this.types$ = this.store.select(fromRoot.getTypes);
        this.selectedAreas$ = this.store.select(fromRoot.getAreasFilter);
        this.selectedTypes$ = this.store.select(fromRoot.getTypesFilter);
        this.setQueryParams(params);
        this.setWatchers(params);
        this.initializeAreas(params);
        this.dispatchActions();
      });
    this.watchers.add(routeWatcher);
  }

  ngOnDestroy(): void {
    if (this.watchers) {
      this.watchers.unsubscribe();
    }
  }

}

