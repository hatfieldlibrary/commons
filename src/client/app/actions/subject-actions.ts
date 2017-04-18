/**
 * Created by mspalti on 2/24/17.
 */

import { Action } from "@ngrx/store";
import { type } from "../shared/ngrx/type";
import {SubjectType} from "../shared/data-types/subject.type";

export const SubjectActionTypes = {
  SUBJECT_LIST: type('[SubjectType] List Subjects for Area Request'),
  SUBJECT_LIST_SUCCESS: type('[SubjectType] List Subjects for Area Response'),
  ALL_SUBJECT_LIST: type('[SubjectType] List All Subjects Request'),
  ALL_SUBJECT_LIST_SUCCESS: type('[SubjectType] List All Subjects Response'),
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

export class AllSubjectAction implements Action {
  type = SubjectActionTypes.ALL_SUBJECT_LIST;
  payload: void;
  constructor() {
  }

}

export class AllSubjectActionSuccess implements Action {
  type = SubjectActionTypes.ALL_SUBJECT_LIST_SUCCESS;

  constructor(public payload: SubjectType[]) {

  }
}

export class SubjectActionFailed implements Action {
  type = SubjectActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err:string) {
    console.log(err)
  }

}

export type SubjectActions = SubjectAction | SubjectActionSuccess | AllSubjectAction | AllSubjectActionSuccess | SubjectActionFailed;
