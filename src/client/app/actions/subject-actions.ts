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
 * Created by mspalti on 2/24/17.
 */

import {Action} from '../actions/action.interface';
import { type } from "../shared/ngrx/type";
import {SubjectType} from "../shared/data-types/subject.type";

export const SubjectActionTypes = {
  SUBJECT_LIST: type('[SubjectType] List Subjects for Area Request'),
  SUBJECT_LIST_SUCCESS: type('[SubjectType] List Subjects for Area Response'),
  ALL_SUBJECT_LIST: type('[SubjectType] List All Subjects Request'),
  ALL_SUBJECT_LIST_SUCCESS: type('[SubjectType] List All Subjects Response'),
  CURRENT_SELECTED_SUBJECT: type('[SubjectType] Currently Selected Subject'),
  REMOVE_CURRENT_SELECTED_SUBJECT: type('[SubjectType] Remove thee currently Selected Subject'),
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

export class CurrentSubject implements Action {
  type = SubjectActionTypes.CURRENT_SELECTED_SUBJECT;

  constructor(public payload: number) {
  }
}
export class RemoveCurrentSubject implements Action {
  type = SubjectActionTypes.CURRENT_SELECTED_SUBJECT;
  payload: void;

  constructor() {
  }

}

export class SubjectActionFailed implements Action {
  type = SubjectActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err:string) {
    console.log(err)
  }

}

export type SubjectActions = SubjectAction | SubjectActionSuccess | AllSubjectAction | AllSubjectActionSuccess | CurrentSubject | SubjectActionFailed;
