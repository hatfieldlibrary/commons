/**
 * Created by mspalti on 2/24/17.
 */

import { Action } from "@ngrx/store";
import { type } from "../shared/ngrx/type";
import {SubjectType} from "../shared/data-types/subject.type";

export const SubjectActionTypes = {
  SUBJECT_LIST: type('[SubjectType] List All Subjects Request'),
  SUBJECT_LIST_SUCCESS: type('[SubjectType] List All Subjects Response'),
  REQUEST_FAILED: type('[SubjectType] Search Failed')
};

export class SubjectAction implements Action {
  type = SubjectActionTypes.SUBJECT_LIST;

  constructor(public payload: string) {
  }

}

export class SubjectActionSuccess implements Action {
  type = SubjectActionTypes.SUBJECT_LIST_SUCCESS;
  payload: SubjectType[];

  constructor(subjects: SubjectType[]) {
    this.payload = subjects;
  }
}

export class SubjectActionFailed implements Action {
  type = SubjectActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err) {
    console.log(err)
  }

}

export type SubjectActions = SubjectAction | SubjectActionSuccess | SubjectActionFailed;