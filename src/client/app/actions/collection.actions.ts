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
 * Created by mspalti on 2/22/17.
 */

import {Action} from '../actions/action.interface';
import {type} from '../shared/ngrx/type';
import {CollectionType} from '../shared/data-types/collection.type';
import {TypeAreaSubjectParams} from './type-area-subject-parameters.interface';
import {CategoryAreaTypeParams} from './category-area-type.interface';
import {CategoryTypeParams} from './category-type.interface';

export interface IdentifersPayload {
  subjectId: string,
  areaId: string
}

export const CollectionActionTypes = {
  SET_FILTER: type('[Collections] Set Collection Filter'),
  CLEAR_FILTER: type('[Collections] Clear Collection Filter'),
  LIST_ALL_ACTION: type('[Collections] List all Collections'),
  LIST_ALL_SUCCESS_ACTION: type('[Collections] List all Collections Success'),
  LIST_BY_AREA: type('[Collections] Search by AreaType'),
  LIST_BY_AREA_SUCCESS: type('[Collections] AreaType Collections'),
  LIST_BY_AREA_SUBJECT: type('[Collections] Search by SubjectType'),
  LIST_BY_AREA_SUBJECT_SUCCESS: type('[Collections] SubjectType Collections'),
  LIST_BY_TYPE: type('[Collections] Collections by Type'),
  LIST_BY_TYPE_AREA: type('[Collections] Collections by Type Area'),
  LIST_BY_TYPE_AREA_SUBJECT: type('[Collections] Collection by Type Area Subject'),
  LIST_BY_CATEGORY_TYPE: type('[Collections] Search by Catgory Type'),
  LIST_BY_CATEGORY_AREA_TYPE: type('[Collections] Category Area Type'),
  LIST_BY_TYPE_SUCCESS: type('[Collections] Collections by Type Success'),
  LIST_BY_TYPE_AREA_SUCCESS: type('[Collections] Collections by Type Area Success'),
  LIST_BY_TYPE_SUBJECT: type('[Collections] Collections by Type Subject'),
  LIST_BY_TYPE_SUBJECT_SUCCESS: type('[Collections] Collections by Type Subject Success'),
  LIST_BY_TYPE_AREA_SUBJECT_SUCCESS: type('[Collections] Collections by Type Area Subject Success'),
  LIST_ALL_BY_SUBJECT: type('[Collections] All Collections by Subject'),
  LIST_ALL_BY_SUBJECT_SUCCESS: type('[Collections] All Collections by Subject Success'),
  LIST_BY_CATEGORY_TYPE_SUCCESS: type('[Collections] Collections by Catgetory Type Success'),
  LIST_BY_CATEGORY_AREA_TYPE_SUCCESS: type('[Collections] Collections by Category Area Type Success'),
  LIST_RESET: type('[Collections] Reset the Collection List to Empty'),
  REQUEST_FAILED: type('[Collections] Search Failed')

};

export class SetCollectionsFilter implements Action {
  type = CollectionActionTypes.SET_FILTER;
  constructor(public payload: string) {
  }
}

export class ClearCollectionsFilter implements Action {
  type = CollectionActionTypes.CLEAR_FILTER;
  payload: void;
  constructor() {
  }
}

export class CollectionReset implements Action {
  type = CollectionActionTypes.LIST_RESET;
  payload: void;
  constructor() {}
}

export class AllCollectionsAction implements Action {
  type = CollectionActionTypes.LIST_ALL_ACTION;
  payload: void;
  constructor() {}

}
export class AllCollectionsActionSuccess implements Action {
  type = CollectionActionTypes.LIST_ALL_SUCCESS_ACTION;
  constructor(public payload: CollectionType[]) {
  }

}

export class CollectionsAreaAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA;
  constructor(public payload: string) {
  }

}

export class CollectionsAreaActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsSubjectAction implements Action {
  type = CollectionActionTypes.LIST_ALL_BY_SUBJECT;
  constructor(public payload: string) {
  }
}

export class CollectionsSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}


export class CollectionsAreaSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsAreaSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUBJECT;
  payload: IdentifersPayload;
  constructor(public id: string, public areaId: string) {
    this.payload = {
      subjectId: id,
      areaId: areaId
    }
  }
}
export class CollectionsCategoryTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUBJECT;
  payload: CategoryTypeParams;
  constructor(categoryId: string, typeId: string) {
    this. payload = {
      categories: categoryId,
      types: typeId
    }
  }
}

export class CollectionsCategoryTypeActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_TYPE_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsCategoryAreaTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE;
  payload: CategoryAreaTypeParams;
  constructor(categoryId: string, areaId: string, typeId: string ) {
    this.payload = {
      categories: categoryId,
      areas: areaId,
      types: typeId
    }
  }
}

export class CollectionsCategoryAreaTypeActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE;
  constructor(public payload: string) {

  }
}

export class CollectionsTypeActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsTypeAreaAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA;
  constructor(public payload: TypeAreaSubjectParams) {

  }
}

export class CollectionsTypeAreaActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsTypeSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_SUBJECT;
  constructor(public payload: TypeAreaSubjectParams) {

  }
}

export class CollectionsTypeSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_SUBJECT_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionsTypeAreaSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT;
  constructor(public payload: TypeAreaSubjectParams) {

  }
}

export class CollectionsTypeAreaSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT_SUCCESS;
  payload: CollectionType[];
  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionActionFailed implements Action {
  type = CollectionActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    console.log(err)
  }

}

export type CollectionActions =
  CollectionsAreaAction |
  CollectionsAreaActionSuccess |
  CollectionReset |
  AllCollectionsAction |
  AllCollectionsActionSuccess |
  CollectionsSubjectAction |
  CollectionsSubjectActionSuccess |
  CollectionsAreaSubjectAction |
  CollectionsAreaSubjectActionSuccess |
  CollectionsTypeAction |
  CollectionsTypeActionSuccess |
  CollectionsTypeAreaAction |
  CollectionsTypeAreaActionSuccess |
  CollectionsTypeSubjectAction |
  CollectionsTypeSubjectActionSuccess |
  CollectionsTypeAreaSubjectAction |
  CollectionsTypeAreaSubjectActionSuccess |
  CollectionActionFailed;
