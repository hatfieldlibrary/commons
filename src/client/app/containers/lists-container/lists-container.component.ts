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
 * The main container component for subject selector, area selector and collection
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
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {AreaListItemType} from '../../shared/data-types/area-list.type';
import {fadeIn} from '../../animation/animations';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {SelectedSubject} from "../../shared/data-types/selected-subject";
import {CurrentSubject} from "../../actions/subject-actions";

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
  areas$: Observable<AreaListItemType[]>;
  areaInfo$: Observable<AreaType[]>;
  areasAvailable: boolean;
  areaId: string;
  subjectLinkType: string;
  homeScreen: boolean;
  title: string;
  subtitle: string;
  subjectId: number;
  state = '';
  watchers: Subscription;
  areas: AreaListItemType[];

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
        this.areas = areas;
        this.areasAvailable = true;
      }
    });
    this.watchers.add(areasWatcher);
  }

  _setAllCollectionTitle() {
    this.title = 'All Collections';
  }

  setItemTitle(): void {

    const areaInfoWatcher = this.store.select(fromRoot.getAreaInfo).subscribe((info) => {
      this.title = '';
      this.subtitle = '';
      // If the local areaId field is set to '0' then just use
      // the default title.
      if (this.areaId === '0') {
        this._setAllCollectionTitle();
      } else if (info.length > 1) {
        // Multiple areas selected, use subtitle format for multiple area info.
        info.forEach((area) => this.subtitle += area.title + ' / ');
        this.subtitle = this.subtitle.substring(0, this.subtitle.length - 2);
      } else if (info[0].title.length > 0) {
        // Otherwise update the title using the new single area information.
        this.title = info[0].title;
      } else {   // Default.
        this._setAllCollectionTitle();
      }
    });
    this.watchers.add(areaInfoWatcher);
  }

  /**
   * Dispatches action for collections by subject and area.
   * @param subjectId
   * @param areaId
   */
  getCollectionsBySubject(subjectId: string, areaId: string): void {
    this.store.dispatch(new listActions.CollectionSubjectAction(subjectId, areaId));
    this.getAreaInformation(areaId);
    this._setSelectedSubject(subjectId);
  }

  /**
   * Dispatches action for collections in an area.
   * @param areaId
   */
  getCollectionsByArea(areaId: string): void {
    this.store.dispatch(new listActions.CollectionAction(areaId));
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

  }

  /**
   * Wrapper for collection actions.
   * @param areaId
   */
  getCollections(areaId: string): void {
    this.getCollectionsByArea(areaId);
    this.getAreaInformation(areaId);

  }

  /**
   * Dispatches action for area information and for list of
   * subjects assigned to the area..
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
  getAllCollectionsForSubject(subjectId: string) {

    this.store.dispatch((new listActions.AllCollectionSubjectAction(subjectId)));
    this.store.dispatch(new subjectAction.AllSubjectAction());
    this._setSelectedSubject(subjectId);

  }

  /**
   * Dispatches action to set the selected subject after the subject list subscription
   * tells us that subjects are available.
   * @param {string} subjectId
   * @private
   */
  _setSelectedSubject(subjectId: string) {
    const subjectsWatcher = this.store.select(fromRoot.getSubject).subscribe(() => {
      this.store.dispatch(new subjectAction.CurrentSubject(+subjectId));
    });
    this.watchers.add(subjectsWatcher);

  }

  /**
   * Dispatches action for area list if not currently available in the store.
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

  ngOnInit() {

    // All component subscriptions will be added to this object.
    this.watchers = new Subscription();

    this.setItemTitle();
    this.setAreasAvailable();

    // The subjects$ Observable is used by child components. This component
    // also subscribes to the subject store in the _setSelectedSubject function.
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.collections$ = this.store.select(fromRoot.getCollections);
    this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);

    const mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ''
      });
    this.watchers.add(mediaWatcher);

    const routeWatcher = this.route.params
      .subscribe((params) => {

        this.subtitle = '';
        this.initializeAreas();

        if (params['areaId']) {
          this.areaId = params['areaId'];
          this.subjectLinkType = 'area';
          if (params['subjectId']) {
            this.subjectId = params['subjectId'];
            this.getCollectionsBySubject(params['subjectId'], params['areaId']);

          } else {
            this.getCollections(params['areaId']);
          }
        } else if (params['subjectId']) {
          this.subjectId = params['subjectId'];
          this.subjectLinkType = 'all';
          this.homeScreen = true;
          this.getAllCollectionsForSubject(params['subjectId']);
          this._setAllCollectionTitle();
          this.areaId = '0';

        }
        else {
          this.subjectLinkType = 'all';
          this.getAllCollections();
          this.homeScreen = true;
          this.areaId = '0';
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

