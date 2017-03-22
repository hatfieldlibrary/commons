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

import * as fromRoot from '../reducers';
import * as listActions from '../actions/collection.actions';
import * as areaActions from '../actions/area.actions';
import * as subjectAction from '../actions/subject-actions';
import {AreaType} from '../shared/data-types/area.type';
import {CollectionType} from '../shared/data-types/collection.type';
import {SubjectType} from '../shared/data-types/subject.type';

@Component({
  selector: 'main-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'main.container.html'
})
export class MainContainer implements OnInit {

  collections$: Observable<CollectionType[]>;
  areas$: Observable<AreaType[]>;
  areaInfo$: Observable<AreaType>;
  subjects$: Observable<SubjectType[]>;
  areaId: string = 'default';
  areasAvailable: boolean = false;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {

  }

  /**
   * Subscribes to areas observable and sets member variable to true if the array is not empty.
   */
  setAreasAvailable(): void {

    this.areas$.subscribe((areas) => {
      if (areas.length > 0) {
        this.areasAvailable = true;
      }
    });

  }

  /**
   * Dispatches action for area list if not currently available in the store.
   * @param id
   */
  getAreas(id: string): void {
    if (!this.areasAvailable) {
      this.store.dispatch(new areaActions.AreaAction(id));
    }
  }

  /**
   * Dispatches action for collections by subject and area.
   * @param subjectId
   * @param areaId
   */
  getCollectionsBySubject(subjectId: string, areaId: string): void {
    this.store.dispatch(new listActions.CollectionSubjectAction(subjectId, areaId))
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
    console.log('get all collections');
    // currently not implemented in tagger.
    this.store.dispatch(new listActions.CollectionAction('1'));
  }

  /**
   * Wrapper for collection actions.
   * @param areaId
   */
  getCollections(areaId): void {
    if (areaId === '0') {
      this.getAllCollections();
    } else {
      this.getCollectionsByArea(areaId);
      this.getAreaInformation(areaId);
    }
  }

  /**
   * Dispatches action for area description information.
   * @param areaId
   */
  getAreaInformation(areaId: string): void {
    this.store.dispatch(new areaActions.AreaInformationUpdate(areaId));
    this.store.dispatch((new subjectAction.SubjectAction((areaId))));

  }

  ngOnInit() {

    this.collections$ = this.store.select(fromRoot.getCollections);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.areaInfo$ = this.store.select(fromRoot.getAreaInfo);

    this.setAreasAvailable();

    this.route.params
      .subscribe((params) => {

        if (params['areaId']) {

          if (params['areaId'] !== this.areaId) {
            this.areaId = params['areaId'];
            this.getAreas(params['areaId']);

          }
          if (params['subjectId']) {
            this.getCollectionsBySubject(params['subjectId'], params['areaId']);

            // Dispatch store update for all subjects...contingent on eventual design decision. Hold for now.

          } else {
            this.getCollections(params['areaId']);

          }

        }
      });

  }

}

