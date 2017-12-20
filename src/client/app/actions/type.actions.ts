

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {ContentTypeListType} from '../shared/data-types/content-types.type';
import {AreaSubjectParams} from './area-subject-parameters.interface';

export const ContentTypeActionTypes = {
  TYPE_LIST: type('[Types] All Types'),
  TYPE_LIST_SUCCESS: type('[Types] All Types Success'),
  TYPE_AREA_LIST: type('[Types] Area Types'),
  TYPE_AREA_LIST_SUCCESS: type('[Types] Area Types Success'),
  TYPE_SUBJECT_LIST: type('[Types] Subject Types'),
  TYPE_SUBJECT_LIST_SUCCESS: type('[Types] Subject Types Success'),
  TYPE_SUBJECT_AREA_LIST: type('[Types] Subject Area Types'),
  TYPE_SUBJECT_AREA_LIST_SUCCESS: type('[Types] Subject Area Types Success'),
  CURRENT_SELECTED_TYPE: type('[Types] Currently Selected Type'),
  REQUEST_FAILED: type('[Types] Types Request Failed')
};

export class ContentTypesAllAction implements Action {
  type = ContentTypeActionTypes.TYPE_LIST;
  payload: void;
  constructor() {}
}

export class CurrentSelectedTypesList implements Action {
  type = ContentTypeActionTypes.CURRENT_SELECTED_TYPE;
  constructor (public payload: string) {}
}

export class ContentTypesAllSuccessAction implements Action {
  type = ContentTypeActionTypes.TYPE_LIST_SUCCESS;
  constructor(public payload: ContentTypeListType[]) {
  }

}

export class ContentTypesAreaAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_LIST;
  constructor(public payload: string) {
  }

}

export class ContentTypesAreaSuccessAction implements Action {
  type = ContentTypeActionTypes.TYPE_AREA_LIST_SUCCESS;
  payload: ContentTypeListType[];
  constructor(payload: ContentTypeListType[]) {
    this.payload = payload;
  }

}

export class ContentTypesSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_LIST;
  constructor(public payload: string) {
  }

}

export class ContentTypesSubjectSuccessAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_LIST_SUCCESS;
  constructor(public payload: ContentTypeListType[]) {
  }

}

export class ContentTypesAreaSubjectAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST;
  constructor(public payload: AreaSubjectParams) {
  }

}

export class ContentTypesAreaSubjectSuccessAction implements Action {
  type = ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST_SUCCESS;
  constructor(public payload: ContentTypeListType[]) {
  }
}

export class TypeActionFailed implements Action {
  type = ContentTypeActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    console.log(err)
  }
}

export type ContentTypeActions =
  CurrentSelectedTypesList |
  ContentTypesAllAction |
  ContentTypesAllSuccessAction |
  ContentTypesAreaAction |
  ContentTypesAreaSuccessAction |
  ContentTypesSubjectAction |
  ContentTypesSubjectSuccessAction |
  ContentTypesAreaSubjectAction |
  ContentTypesAreaSubjectSuccessAction |
  TypeActionFailed;

