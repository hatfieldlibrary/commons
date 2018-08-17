

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

import {type} from '../type';
import {Action} from './action.interface';
import {FieldFilterType} from '../../data-types/field-filter.type';
import {IdentifersPayload} from './payload-parameters.interface';

export const GroupActionTypes = {

  ALL_GROUP_REQUEST: type('[Group] Request Group.'),
  GROUPS_BY_AREA: type('[Group] Group by Area'),
  GROUPS_BY_TYPE: type('[Group] Group by Type'),
  GROUPS_BY_SUBJECT: type('[Group] Group by Subject'),
  GROUPS_BY_SUBJECT_TYPE: type('[Group] Group by Subject Type'),
  GROUPS_BY_AREA_TYPE: type('[Group] Group by Area Type'),
  GROUPS_BY_AREA_SUBJECT: type('[Group] Group by Area Subject'),
  GROUPS_BY_AREA_SUBJECT_TYPE: type('[Group] Group by Area Subject Type'),
  GROUPS_ACTION_SUCCESS: type('[Group] Group Action Success'),
  REQUEST_FAILED: type('[Group] Request Failed'),
  GROUP_LIST_RESET: type('[Group] Reset the Group List to Empty'),

};


export class GroupsReset implements Action {
  type = GroupActionTypes.GROUP_LIST_RESET;
  payload: void;
  constructor() {}
}

export class AllGroupsAction implements Action {
  type = GroupActionTypes.ALL_GROUP_REQUEST;
  payload: void;
  constructor() {}
}


export class GroupsByArea implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA;
  constructor(public payload: string) {}
}


export class GroupsByType implements Action {
  type = GroupActionTypes.GROUPS_BY_TYPE;
  constructor(public payload: string) {}
}

export class GroupsBySubject implements Action {
  type = GroupActionTypes.GROUPS_BY_SUBJECT;
  constructor(public payload: string) {}
}


export class GroupsBySubjectType implements Action {
  type = GroupActionTypes.GROUPS_BY_SUBJECT_TYPE;
  payload: IdentifersPayload;
  constructor(subjectId: string, typeId: string) {
    this.payload = {
      categoryId: '',
      subjectId: subjectId,
      typeId: typeId,
      areaId: ''
    }
  }
}

export class GroupsByAreaType implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_TYPE;
  payload: IdentifersPayload;
  constructor(areaId: string, typeId: string) {
    this.payload = {
      categoryId: '',
      typeId: typeId,
      areaId: areaId,
      subjectId: ''
    }
  }
}


export class GroupsByAreaSubject implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_SUBJECT;
  payload: IdentifersPayload;
  constructor(areaId: string, subjectId: string) {
    this.payload = {
      categoryId: '',
      subjectId: subjectId,
      areaId: areaId,
      typeId: ''
    }
  }
}

export class GroupsByAreaSubjectType implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_SUBJECT_TYPE;
  payload: IdentifersPayload;
  constructor(areaId: string, subjectId: string, typeId: string) {
    this.payload = {
      categoryId: '',
      subjectId: subjectId,
      areaId: areaId,
      typeId: typeId
    }
  }
}

export class GroupActionSuccess implements Action {
  type = GroupActionTypes.GROUPS_ACTION_SUCCESS;
  constructor(public payload: FieldFilterType[]) {}
}


export class GroupActionFailed implements Action {
  type = GroupActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    if (err !== 'test') {
      console.log(err);
    }
  }
}

export type CollectionGroupActions =
  GroupsReset |
  AllGroupsAction |
  GroupsByArea |
  GroupsByType |
  GroupsBySubject |
  GroupsBySubjectType |
  GroupsByAreaSubjectType |
  GroupsByAreaType |
  GroupsByAreaSubject |
  GroupActionSuccess |
  GroupActionFailed;


