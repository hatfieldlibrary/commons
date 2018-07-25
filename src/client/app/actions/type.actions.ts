

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

export interface TypesFilterInterface {
  areaId: string;
  subjectId: string;
  groupId: string;
}

export const ContentTypeActionTypes = {
  TYPE_LIST: type('[Types] All Types'),
//  TYPE_LIST_SUCCESS: type('[Types] All Types Success'),
  TYPE_AREA_LIST: type('[Types] Area Types'),
//  TYPE_AREA_LIST_SUCCESS: type('[Types] Area Types Success'),
  TYPE_SUBJECT_LIST: type('[Types] Subject Types'),
//  TYPE_SUBJECT_LIST_SUCCESS: type('[Types] Subject Types Success'),
  TYPE_SUBJECT_AREA_LIST: type('[Types] Subject Area Types'),
//  TYPE_SUBJECT_AREA_LIST_SUCCESS: type('[Types] Subject Area Types Success'),
  TYPE_SUBJECT_GROUP_LIST: type('[Types] Subject Group Types'),
//  TYPE_SUBJECT_GROUP_LIST_SUCCESS: type('[Types] Subject Group Types Success'),
  TYPE_AREA_GROUP_LIST: type('[Types] Area Group Types'),
//  TYPE_AREA_GROUP_LIST_SUCCESS: type('[Types] Area Group Types Success'),
  TYPE_AREA_SUBJECT_GROUP_LIST: type('[Types] Subject Area Group Types'),
//  TYPE_AREA_SUBJECT_GROUP_LIST_SUCCESS: type('[Types] Subject Area Group Types Success'),
  CURRENT_SELECTED_TYPE: type('[Types] Currently Selected Type'),
  TYPES_REQUEST_SUCCESS: type('[Types] Types request succeeded.'),
  REQUEST_FAILED: type('[Types] Types Request Failed')
};

export class ContentTypesAllAction implements Action {
  type = ContentTypeActionTypes.TYPE_LIST;
  payload: void;
  constructor() {}
}
//
// export class CurrentSelectedTypesList implements Action {
//   type = ContentTypeActionTypes.CURRENT_SELECTED_TYPE;
//   constructor (public payload: string) {}
// }

// export class ContentTypesAllSuccessAction implements Action {
//   type = ContentTypeActionTypes.TYPE_LIST_SUCCESS;
//   constructor(public payload: TypesFilterType[]) {
//   }
//
// }

export class ContentTypesAreaAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_LIST;
  constructor(public payload: string) {
  }

}

// export class ContentTypesAreaSuccessAction implements Action {
//   type = ContentTypeActionTypes.TYPE_AREA_LIST_SUCCESS;
//   payload: TypesFilterType[];
//   constructor(payload: TypesFilterType[]) {
//     this.payload = payload;
//   }
//
// }

export class ContentTypesSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_LIST;
  constructor(public payload: string) {
  }

}

// export class ContentTypesSubjectSuccessAction implements Action {
//   type = ContentTypeActionTypes.TYPE_SUBJECT_LIST_SUCCESS;
//   constructor(public payload: TypesFilterType[]) {
//   }
//
// }

export class ContentTypesAreaSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST;
  constructor(public payload: TypesFilterInterface) {
  }

}

// export class ContentTypesAreaSubjectSuccessAction implements Action {
//   type = ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST_SUCCESS;
//   constructor(public payload: TypesFilterType[]) {
//   }
// }

export class ContentTypesAreaGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_GROUP_LIST;
  constructor(public payload: TypesFilterInterface) {
  }

}

export class ContentTypesSubjectGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_GROUP_LIST;
  constructor(public payload: TypesFilterInterface) {
  }

}

export class ContentTypesAreaSubjectGroupAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_SUBJECT_GROUP_LIST;
  constructor(public payload: TypesFilterInterface) {
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
 // CurrentSelectedTypesList |
ContentTypesActionSuccess |
  ContentTypesAllAction |
//  ContentTypesAllSuccessAction |
  ContentTypesAreaAction |
//  ContentTypesAreaSuccessAction |
  ContentTypesSubjectAction |
//  ContentTypesSubjectSuccessAction |
  ContentTypesAreaSubjectAction |
//  ContentTypesAreaSubjectSuccessAction |
  ContentTypesAreaGroupAction |
  ContentTypesSubjectGroupAction |
  ContentTypesAreaSubjectGroupAction |
  TypeActionFailed;

