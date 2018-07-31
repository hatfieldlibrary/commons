

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {TypeSubjectInterface} from './type-subject.interface';
import {AreaTypeSubjectInterface} from './area-type-subject.interface';
import {AreaTypeInterface} from './area-type.interface';
import {AreaSubjectInterface} from './area-subject.interface';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

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
  payload: TypeSubjectInterface;
  constructor(subjectId: string, typeId: string) {
    this.payload = {
      subjects: subjectId,
      types: typeId
    }
  }
}

export class GroupsByAreaType implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_TYPE;
  payload: AreaTypeInterface;
  constructor(areaId: string, typeId: string) {
    this.payload = {
      types: typeId,
      areas: areaId
    }
  }
}


export class GroupsByAreaSubject implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_SUBJECT;
  payload: AreaSubjectInterface;
  constructor(areaId: string, subjectId: string) {
    this.payload = {
      subjects: subjectId,
      areas: areaId
    }
  }
}

export class GroupsByAreaSubjectType implements Action {
  type = GroupActionTypes.GROUPS_BY_AREA_SUBJECT_TYPE;
  payload: AreaTypeSubjectInterface;
  constructor(areaId: string, subjectId: string, typeId: string) {
    this.payload = {
      areas: areaId,
      subjects: subjectId,
      types: typeId
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


