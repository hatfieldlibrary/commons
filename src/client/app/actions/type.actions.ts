

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {FieldFilterType} from '../shared/data-types/field-filter.type';
import {IdentifersPayload} from './payload-parameters.interface';

export const ContentTypeActionTypes = {
  TYPE_LIST: type('[Types] All Types'),
  TYPE_AREA_LIST: type('[Types] Area Types'),
  TYPE_SUBJECT_LIST: type('[Types] Subject Types'),
  TYPE_SUBJECT_AREA_LIST: type('[Types] Subject Area Types'),
  TYPE_SUBJECT_GROUP_LIST: type('[Types] Subject Group Types'),
  TYPE_AREA_GROUP_LIST: type('[Types] Area Group Types'),
  TYPE_AREA_SUBJECT_GROUP_LIST: type('[Types] Subject Area Group Types'),
  CURRENT_SELECTED_TYPE: type('[Types] Currently Selected Type'),
  TYPES_REQUEST_SUCCESS: type('[Types] Types request succeeded.'),
  REQUEST_FAILED: type('[Types] Types Request Failed')
};

export class ContentTypesAllAction implements Action {
  type = ContentTypeActionTypes.TYPE_LIST;
  payload: void;
  constructor() {}
}

export class ContentTypesAreaAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_LIST;
  constructor(public payload: string) {
  }

}

export class ContentTypesSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_LIST;
  constructor(public payload: string) {
  }

}

export class ContentTypesAreaSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST;
  payload: IdentifersPayload;
  constructor(areaId: string, subjectId: string) {
    this.payload = {
      categoryId: '',
      subjectId: subjectId,
      typeId: '',
      areaId: areaId
    }
  }
}

export class ContentTypesAreaGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_GROUP_LIST;
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

export class ContentTypesSubjectGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_GROUP_LIST;
  payload: IdentifersPayload;
  constructor(subjectId: string, categoryId: string) {
    this.payload = {
      categoryId: categoryId,
      subjectId: subjectId,
      typeId: '',
      areaId: ''
    }
  }

}

export class ContentTypesAreaSubjectGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_SUBJECT_GROUP_LIST;
  payload: IdentifersPayload
  constructor(areaId: string, categoryId: string, subjectId: string) {
    this.payload = {
      categoryId: categoryId,
      subjectId: subjectId,
      typeId: '',
      areaId: areaId
    }
  }

}

export class ContentTypesActionSuccess implements Action {
  type = ContentTypeActionTypes.TYPES_REQUEST_SUCCESS;
  constructor(public payload: FieldFilterType[]) {
  }
}

export class TypeActionFailed implements Action {
  type = ContentTypeActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    if (err !== 'test') {
      console.log(err);
    }
  }
}

export type ContentTypeActions =
ContentTypesActionSuccess |
  ContentTypesAllAction |
  ContentTypesAreaAction |
  ContentTypesSubjectAction |
  ContentTypesAreaSubjectAction |
  ContentTypesAreaGroupAction |
  ContentTypesSubjectGroupAction |
  ContentTypesAreaSubjectGroupAction |
  TypeActionFailed;

