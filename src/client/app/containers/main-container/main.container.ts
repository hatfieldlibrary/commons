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
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import * as Reselect from 'reselect';
import Selector = Reselect.Selector;
import {Store} from '@ngrx/store';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import * as areaActions from '../../actions/area.actions';
import * as subjectAction from '../../actions/subject-actions';
import {AreaType} from '../../shared/data-types/area.type';
import {CollectionType} from '../../shared/data-types/collection.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {AreaListItemType} from "../../shared/data-types/area-list.type";

@Component({
  selector: 'main-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'main.container.html'
})
export class MainContainer implements OnInit {

  collections$: Observable<CollectionType[]>;
  areas$: Observable<AreaListItemType[]>;
  areaInfo$: Observable<AreaType>;
  subjects$: Observable<SubjectType[]>;
  globalSubjects$:  Observable<SubjectType[]>;
  areasAvailable: boolean = false;
  subjectsAvailable: boolean = false;
  areaId: string;
  subjectLinkType: string;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {

  }

  /**
   * Subscribes to areaList observable and sets member variable to true if the array
   * is not empty.
   */
  setAreasAvailable(): void {
    this.areas$.subscribe((areas) => {
      console.log(areas)
      // id is 0 in initial state.
      if (areas[0].id > 0) {
        this.areasAvailable = true;
      }
    });

  }

  /**
   * Dispatches action for collections by subject and area.
   * @param subjectId
   * @param areaId
   */
  getCollectionsBySubject(subjectId: string, areaId: string): void {
    this.store.dispatch(new listActions.CollectionSubjectAction(subjectId, areaId));

  }

  /**
   * Dispatches action for collections in an area.
   * @param areaId
   */
  getCollectionsByArea(areaId: string): void {
    this.store.dispatch(new listActions.CollectionAction(areaId));
  }

  /**
   * Dispatches action to fetch all collections.
   */
  getAllCollections(): void {
    this.store.dispatch(new listActions.AllCollectionsAction());
    this.store.dispatch(new subjectAction.AllSubjectAction());
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
  }

  /**
   * Dispatches action for area list if not currently available in the store.
   * @param id
   */
  initializeAreas() {
    console.log('init area list ' + this.areasAvailable);
    if (!this.areasAvailable) {
      this.store.dispatch(new areaActions.AreaAction());
    }

  }


  ngOnInit() {

    this.collections$ = this.store.select(fromRoot.getCollections);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);

    this.setAreasAvailable();


    this.route.params

      .subscribe((params) => {

        this.initializeAreas();

        if (params['areaId']) {

          this.areaId = params['areaId'];
          this.subjectLinkType = 'area';

          if (params['subjectId']) {

            this.getCollectionsBySubject(params['subjectId'], params['areaId']);

          } else {
            this.getCollections(params['areaId']);

          }

        }
        else if(params['subjectId']) {

          this.subjectLinkType = 'all';
          this.getAllCollectionsForSubject(params['subjectId']);
        }
        else {

          this.subjectLinkType = 'all';
          this.getAllCollections();
        }

      });

  }

}

