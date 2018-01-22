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
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {AreaListItemType} from '../../shared/data-types/area-list.type';
import {fadeIn} from '../../animation/animations';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {AreaSubjectParams} from '../../actions/area-subject-parameters.interface';
import {TypeAreaSubjectParams} from '../../actions/type-area-subject-parameters.interface';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';

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
  areas$: Observable<AreaListItemType[]>;
  areaInfo$: Observable<AreaType[]>;
  types$: Observable<TypesFilterType[]>;
  areasAvailable: boolean;
  areaId: string;
  subjectLinkType: string;
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

  /**
   * Subscribes to areaList observable and sets member variable to true if the array
   * is not empty.
   */
  setAreasAvailable(): void {
    const areasWatcher = this.store.select(fromRoot.getAreas).subscribe((areas) => {
      // id is 0 in initial state.
      if (areas[0].id > 0) {
      //  this.areas = areas;
        this.areasAvailable = true;
      }
    });
    this.watchers.add(areasWatcher);
  }

  setAllCollectionTitle() {
    this.title = 'All Collections';
  }

  setItemTitle(): void {

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

  /**
   * Dispatches action for collections by subject and areas.
   * @param subjectId
   * @param areaId
   */
  getCollectionsBySubject(subjectId: string, areaId: string): void {
    this.store.dispatch(new listActions.CollectionsSubjectAction(subjectId));
    // this.getAreaInformation(areaId);
    this.setSelectedSubject(subjectId);
  }

  /**
   * Dispatches action for collections in an areas.
   * @param areaId
   */
  getCollectionsByArea(areaId: string): void {
    this.store.dispatch(new listActions.CollectionsAreaAction(areaId));
    this.store.dispatch(new subjectAction.RemoveCurrentSubject());

  }

  /**
   * Dispatches action to fetch all collections.
   */
  getAllCollections(): void {
    this.title = 'All Collections';
    this.store.dispatch(new listActions.AllCollectionsAction());
    this.store.dispatch(new subjectAction.AllSubjectAction());
    this.store.dispatch(new subjectAction.RemoveCurrentSubject());
    this.store.dispatch(new areaActions.AreaDefaultInformation());

  }

  /**
   * Wrapper for collection actions.
   * @param areaId
   */
  getCollections(areaId: string): void {
    this.getCollectionsByArea(areaId);
    // this.getAreaInformation(areaId);

  }

  /**
   * Dispatches action for areas information and for list of
   * subjects assigned to the areas..
   * @param areaId
   */
  getAreaInformation(areaId: string): void {
    this.store.dispatch(new areaActions.AreaInformation(areaId));
    this.store.dispatch((new subjectAction.SubjectAction((areaId))));
  }

  /**
   * Dispatches request for all collections that have the given subject.
   *
   * Also dispatches request for list of subjects. This assures that subjects
   * are in the store when user links directly to this page. If global subjects
   * are implemented in the final product, it may make sense to assign these
   * to their own reducer, since the state of the global list will not change.
   * That way we can initialize once.
   *
   * @param subjectId
   */
  getAllCollectionsForSubject(subjectId: string): void {

    this.store.dispatch((new listActions.CollectionsSubjectAction(subjectId)));
    this.store.dispatch(new subjectAction.AllSubjectAction());
    this.setSelectedSubject(subjectId);

  }

  getAllCollectionsForType(typeId: string): void {
    this.store.dispatch(new listActions.CollectionsTypeAction(typeId));
    this.store.dispatch(new subjectAction.SubjectsForTypes(typeId));
  }

  getCollectionsForTypeSubject(typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: [],
      types: typeId.split(','),
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeSubjectAction(params));
  }

  getCollectionsForTypeAreaSubject(areaId: string, typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaSubjectAction(params));
  }

  getCollectionsForAreaType(areaId: string, typeId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: ''
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaAction(params));
    this.store.dispatch(new subjectAction.SubjectsForAreaTypes(areaId, typeId));
  }

  /**
   * Dispatches action to set the selected subject after the subject list subscription
   * tells us that subjects are available.
   * @param {string} subjectId
   * @private
   */
  private setSelectedSubject(subjectId: string) {
    const subjectsWatcher = this.store.select(fromRoot.getSubject).subscribe(() => {
      this.store.dispatch(new subjectAction.CurrentSubject(subjectId));
    });
    this.watchers.add(subjectsWatcher);

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

  /**
   * Dispatches action for areas list if not currently available in the store.
   * @param id
   */
  initializeAreas() {
    if (!this.areasAvailable) {
      this.store.dispatch(new areaActions.AreaAction());
    }

  }

  removeSubject(event) {
    if (this.areaId && this.areaId !== '0') {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection/area/' + this.areaId);
    } else {
      this.router.navigateByUrl('/' + environment.appRoot + '/collection');
    }
  }

  setIds(params: any): void {
    if (params['areaId']) {
      this.areaId = params['areaId'];
    }
    if (params['subjectId']) {
      this.subjectId = params['subjectId']
    }
    if (params['typeId']) {
      this.selectedTypes = params['typeId'];
    }
  }

  ngOnInit() {

    // All component subscriptions will be added to this object.
    this.watchers = new Subscription();

    this.setItemTitle();
    this.setAreasAvailable();

    // The subjects$ Observable is used by child components. This component
    // also subscribes to the subject store in the setSelectedSubject function.
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.collections$ = this.store.select(fromRoot.getFilteredCollections);
    this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);
    this.types$ = this.store.select(fromRoot.getTypes);
    this.selectedAreas$ = this.store.select(fromRoot.getAreasFilter);

    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ''
      });
    this.watchers.add(mediaWatcher);

    const routeWatcher = this.route.params
      .subscribe((params) => {

        this.initializeAreas();
       // this.setIds(params);

        if (params['areaId']) {
          this.subjectLinkType = 'area';
          this.getAreaInformation(params['areaId']);
          if (params['subjectId']) {
            if (params['typeId']) {
              this.getCollectionsForTypeAreaSubject(params['areaId'], params['typeId'], params['subjectId']);
            } else {
              this.getCollectionsBySubject(params['subjectId'], params['areaId']);
            }
            this.getTypesForAreaSubject(params['areaId'], params['subjectId']);
          } else {
            if (params['typeId']) {
              this.getCollectionsForAreaType(params['areaId'], params['typeId']);
            } else {
              this.getCollections(params['areaId']);
            }
            this.getTypesForArea(params['areaId']);
          }
        } else if (params['subjectId']) {
          this.subjectLinkType = 'all';
          this.homeScreen = true;
          if (params['typeId']) {
            this.getCollectionsForTypeSubject(params['typeId'], params['subjectId']);
          } else {
            this.getAllCollectionsForSubject(params['subjectId']);
          }
          this.setAllCollectionTitle();
          this.getTypesForSubject(params['subjectId']);
          this.areaId = '0';

        } else {
          this.areaId = '0';
          this.subjectLinkType = 'all';
          if (params['typeId']) {
            this.getAllCollectionsForType(params['typeId']);
          } else {
            this.getAllCollections();
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

