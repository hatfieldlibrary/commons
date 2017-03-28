/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as subjects from '../actions/subject-actions';
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {SubjectService} from "../services/subject.service";

@Injectable()
export class SubjectEffects {

  constructor(private svc: SubjectService, private actions$: Actions) {
  }

  @Effect()
  subjectEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST)
    .map((action: subjects.SubjectAction) => action.payload)
    .switchMap(id => this.svc.getSubjects(id))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch((err) => Observable.of(new subjects.SubjectActionFailed(err)));


}
