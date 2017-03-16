/**
 * The main container component for subject selector, area selector and collection
 * list components
 */

import * as Reselect from "reselect";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import Selector = Reselect.Selector;
import {Store} from "@ngrx/store";
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import * as fromRoot from '../reducers';
import * as listActions from "../actions/collection.actions";
import * as areaActions from "../actions/area.actions";
import * as subjectAction from "../actions/subject-actions";
import {AreaType} from "../shared/data-types/area.type";
import {CollectionType} from "../shared/data-types/collection.type";
import {SubjectType} from "../shared/data-types/subject.type";

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
  areaId: string;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {

    this.collections$ = store.select(fromRoot.getCollections);
    this.areas$ = store.select(fromRoot.getAreas);
    this.subjects$ = store.select(fromRoot.getSubject);
    this.areaInfo$ = store.select(fromRoot.getAreaInfo);


  }

  ngOnInit() {

    //  Subscribe to route params observable to detect updates.
    this.route.params
      .subscribe((params) => {

        // This member variable is input to the subject selector component.
        this.areaId = params['areaId'];

        // Dispatch store update for areas.
        this.store.dispatch(new areaActions.AreaAction(params['areaId']));

        if (params['subjectId']) {
          // Updates the area information after selection.
          this.store.dispatch(new areaActions.AreaInformationUpdate(params['areaId']));

          // This is a request for a list of collections by subject.
          this.store.dispatch(new listActions.CollectionSubjectAction(params['subjectId'], params['areaId']))

        } else {

          // This is a request for list of collections by area.
          this.store.dispatch(new listActions.CollectionAction(params['areaId']));

          if (this.areaId !== '0') {
            // Updates the area information after selection.
            this.store.dispatch(new areaActions.AreaInformationUpdate(params['areaId']));
            this.store.dispatch((new subjectAction.SubjectAction((params['areaId']))));
          }

        }

      });


    // Dispatch store update for all subjects...contingent on eventual design decision. Hold for now.

  }

}
