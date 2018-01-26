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
  selectedTypes: string;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private router: Router,
              public media: ObservableMedia) {

  }

  private setAllCollectionTitle() {
    this.title = 'All Collections';
  }

  // are these being used...what is the purpose.
  private setItemTitle(): void {
    const areaInfoWatcher = this.store.select(fromRoot.getAreaInfo).subscribe((info) => {
      console.log(info)
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
    console.log('getting area info')
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
    const subjectsWatcher = this.store.select(fromRoot.getSubject).subscribe(() => {
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
    const areasWatcher = this.store.select(fromRoot.getAreas).subscribe((areas) => {
      const areaArr = areaId.split(',');
      const selectedAreas: AreaFilterType[] = [];
      areaArr.forEach(function (singleAreaId) {
        const selected = areas.find((area) => area.id === +singleAreaId);
        if (selected) {
          selectedAreas.push(selected);
        }
      });
      if (selectedAreas.length > 0) {
        this.store.dispatch(new filterActions.SetAreaFilter(selectedAreas));
      }
    });
    this.watchers.add(areasWatcher);
  }
  /**
   * Adds a watcher for the type list. The callback function uses the provided typeId
   * to create an array of selected types from the current list of types. The selected
   * types are dispatched to the store. This initializes the selected types on page load.
   *
   * @param {string} areaId comma separated string of area ids.
   */
  private setSelectedTypes(typeId: string): void {
    const typesWatcher = this.store.select(fromRoot.getTypes).subscribe((types) => {
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
    return (typeof this.selectedTypes !== 'undefined' && this.selectedTypes !== '0');
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
      console.log('is see type is selected')
      this.getAreasByType(params['typeId']);
    } else {
      this.getAllAreas();
    }
  }

  removeSubject(event) {
    if (this.isAreaSelected() && this.isTypeSelected()) {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId + '/type/' + this.selectedTypes);
    } else if (this.isAreaSelected()) {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId);
    } else {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection');
    }
    this.store.dispatch(new subjectAction.RemoveCurrentSubject());
  }

  private setQueryState(params: any): void {

    if (params['areaId']) {
      this.areaId = params['areaId'];
      this.setSelectedArea(params['areaId']);
    }
    if (params['subjectId']) {
      this.subjectId = params['subjectId'];
      this.setSelectedSubject(params['subjectId']);
    }
    if (params['typeId']) {
      this.selectedTypes = params['typeId'];
      this.setSelectedTypes(params['typeId']);
    }
  }

  private setMediaWatcher(): void {
    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ''
      });
    this.watchers.add(mediaWatcher);
  }

  ngOnInit() {

    // All subscriptions are added to this Subscription so
    // the can be removed in ngOnDestroy.
    this.watchers = new Subscription();
    this.setItemTitle();
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.collections$ = this.store.select(fromRoot.getFilteredCollections);
    this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
    this.types$ = this.store.select(fromRoot.getTypes);
    this.selectedAreas$ = this.store.select(fromRoot.getAreasFilter);
    this.selectedTypes$ = this.store.select(fromRoot.getTypesFilter);

    this.setMediaWatcher();

    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.setQueryState(params);
        this.initializeAreas(params);
        if (params['areaId']) {
          this.getAreaInformation(params['areaId']);
          if (params['subjectId']) {
            if (params['typeId']) {
              this.getCollectionsForTypeAreaSubject(params['areaId'], params['typeId'], params['subjectId']);
              this.getSubjectsForAreaType(params['areaId'], params['typeId']);
            } else {
              this.getCollectionsForAreaSubject(params['areaId'], params['subjectId']);
              this.getSubjectsForArea(params['areaId']);
            }
            this.getTypesForAreaSubject(params['areaId'], params['subjectId']);
          } else {
            if (params['typeId']) {
              this.getCollectionsForAreaType(params['areaId'], params['typeId']);
              this.getSubjectsForAreaType(params['areaId'], params['typeId']);
            } else {
              this.getCollectionsForArea(params['areaId']);
              this.getSubjectsForArea(params['areaId']);
            }
            this.getTypesForArea(params['areaId']);
          }
        } else if (params['subjectId']) {
          this.homeScreen = true;
          if (params['typeId']) {
            this.getCollectionsForTypeSubject(params['typeId'], params['subjectId']);
            this.getSubjectsForType(params['typeId']);
          } else {
            this.getCollectionsForSubject(params['subjectId']);
            this.getAllSubjects();
          }
          this.setAllCollectionTitle();
          this.getTypesForSubject(params['subjectId']);
          this.areaId = '0';
        } else {
          this.areaId = '0';
          if (params['typeId']) {
            this.getCollectionsForType(params['typeId']);
            this.getSubjectsForType(params['typeId']);
          } else {
            this.getAllCollections();
            this.getAllSubjects();
          }
          this.getAllTypes();
          this.homeScreen = true;
        }
      });

    this.watchers.add(routeWatcher);

  }

  ngOnDestroy(): void {
    if (this.watchers) {
      this.watchers.unsubscribe();
    }
  }

}

