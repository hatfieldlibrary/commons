/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

/**
 * Created by mspalti on 2/24/17.
 */

import {Action} from './action.interface';
import {type} from '../shared/ngrx/type';
import {FieldFilterType} from '../shared/data-types/field-filter.type';
import {IdentifersPayload} from './payload-parameters.interface';

export const SubjectActionTypes = {
  SUBJECT_LIST: type('[SubjectType] List Subjects for Area Request'),
  ALL_SUBJECT_LIST: type('[SubjectType] List All Subjects Request'),
  SUBJECT_LIST_FOR_TYPE: type('[SubjectType] List of Subjects for Types'),
  SUBJECT_LIST_FOR_AREA_TYPE: type('[SubjectType] List of Subjects for Area and Types'),
  SUBJECT_LIST_FOR_GROUP_AREA: type('SubjectType] For Group Area'),
  SUBJECT_LIST_FOR_GROUP_AREA_TYPE: type('SubjectType] For Group Area Type'),
  REMOVE_CURRENT_SELECTED_SUBJECT: type('[SubjectType] Remove currently Selected Subjects'),
  CURRENT_SELECTED_SUBJECT: type('[SubjectType] Currently Selected Subject'),
  SUBJECT_REQUEST_SUCCESS: type('{SubjectType] Subject Request Success'),
  REQUEST_FAILED: type('[SubjectType] Search Failed')
};


export class SubjectAction implements Action {
  type = SubjectActionTypes.SUBJECT_LIST;

  constructor(public payload: string) {
  }
}

export class AllSubjectAction implements Action {
  type = SubjectActionTypes.ALL_SUBJECT_LIST;
  payload: void;

  constructor() {
  }
}

export class SubjectsForTypes implements Action {
  type = SubjectActionTypes.SUBJECT_LIST_FOR_TYPE;

  constructor(public payload: string) {
  }
}

export class SubjectsForAreaTypes implements Action {
  type = SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE;
  payload: IdentifersPayload;
  constructor(areaId: string, typeId: string) {
    this.payload = {
      categoryId: '',
      subjectId: '',
      typeId: typeId,
      areaId: areaId
    }
  }
}

export class SubjectsForAreaGroup implements Action {
  type = SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA;
  payload: IdentifersPayload;
  constructor(areaId: string, groupId: string) {
    this.payload = {
      categoryId: groupId,
      subjectId: '',
      typeId: '',
      areaId: areaId
    }
  }
}

export class SubjectsForAreaGroupType implements Action {
  type = SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA_TYPE;
  payload: IdentifersPayload;
  constructor(areaId: string, groupId: string, typeId: string) {
    this.payload = {
      categoryId: groupId,
      subjectId: '',
      typeId: typeId,
      areaId: areaId
    }
  }
}

export class CurrentSubject implements Action {
  type = SubjectActionTypes.CURRENT_SELECTED_SUBJECT;

  constructor(public payload: string) {
  }
}

export class RemoveCurrentSubject implements Action {
  type = SubjectActionTypes.REMOVE_CURRENT_SELECTED_SUBJECT;
  payload: void;

  constructor() {
  }
}

export class SubjectActionFailed implements Action {
  type = SubjectActionTypes.REQUEST_FAILED;
  payload: void;

  constructor(err: string) {
    if (err !== 'test') {
      console.log(err);
    }
  }
}

export class SubjectActionSuccess implements Action {
  type = SubjectActionTypes.SUBJECT_REQUEST_SUCCESS;

  constructor(public payload: FieldFilterType[]) {
  }
}

export type SubjectActions =
  SubjectAction |
  SubjectActionSuccess |
  AllSubjectAction |
  SubjectsForTypes |
  SubjectsForAreaTypes |
  SubjectsForAreaGroup |
  SubjectsForAreaGroupType |
  CurrentSubject |
  SubjectActionFailed;
