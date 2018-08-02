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
 * Created by mspalti on 2/22/17.
 */

import {Action} from './action.interface';
import {type} from '../shared/ngrx/type';
import {CollectionType} from '../shared/data-types/collection.type';
import {IdentifersPayload} from './payload-parameters.interface';

export const CollectionActionTypes = {
  SET_FILTER: type('[Collections] Set Collection Filter'),
  CLEAR_FILTER: type('[Collections] Clear Collection Filter'),
  LIST_ALL_ACTION: type('[Collections] List all Collections'),
  LIST_BY_AREA: type('[Collections] Search by AreaType'),
  LIST_BY_SUBJECT: type('[Collections] All Collections by Subject'),
  LIST_BY_SUBJECT_AREA: type('[Collections] Search by SubjectType'),
  LIST_BY_TYPE: type('[Collections] Collections by Type'),
  LIST_BY_TYPE_AREA: type('[Collections] Collections by Type Area'),
  LIST_BY_TYPE_AREA_SUBJECT: type('[Collections] Collection by Type Area Subject'),
  LIST_BY_TYPE_SUBJECT: type('[Collections] Collections by Type Subject'),
  LIST_BY_CATEGORY: type('[Collections] Collections by Category'),
  LIST_BY_CATEGORY_TYPE: type('[Collections] Search by Category Type'),
  LIST_BY_CATEGORY_SUBJECT: type('[Collections] Search by Category Subject'),
  LIST_BY_CATEGORY_AREA: type('[Collections] Search by Category Area'),
  LIST_BY_CATEGORY_AREA_TYPE: type('[Collections] Category Area Type'),
  LIST_BY_CATEGORY_AREA_SUBJECT: type('[Collections] Category Area Subject'),
  LIST_BY_CATEGORY_TYPE_SUBJECT: type('[Collections] Category Type Subject'),
  LIST_BY_CATEGORY_AREA_TYPE_SUBJECT: type('[Collections] Category Area Type Subject'),
  LIST_RESET: type('[Collections] Reset the Collection List to Empty'),
  REQUEST_FAILED: type('[Collections] Search Failed'),
  COLLECTION_ACTION_SUCCESS: type('[Collections] Request successfult')

};

export class CollectionsActionSuccess implements Action {
  type = CollectionActionTypes.COLLECTION_ACTION_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }
}

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

  constructor() {
  }
}

export class AllCollectionsAction implements Action {
  type = CollectionActionTypes.LIST_ALL_ACTION;
  payload: void;

  constructor() {
  }

}

export class CollectionsAreaAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA;

  constructor(public payload: string) {
  }

}

export class CollectionsSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_SUBJECT;

  constructor(public payload: string) {
  }
}

export class CollectionsAreaSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_SUBJECT_AREA;
  payload: IdentifersPayload;

  constructor(public id: string, public areaId: string) {
    this.payload = {
      subjectId: id,
      areaId: areaId,
      categoryId: '',
      typeId: ''
    }
  }
}

export class CollectionsCategoryAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY;
  payload: IdentifersPayload;

  constructor(categoryId: string) {
    this.payload = {
      subjectId: '',
      areaId: '',
      categoryId: categoryId,
      typeId: ''
    }
  }
}

export class CollectionsCategoryAreaAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA;
  payload: IdentifersPayload;

  constructor(categoryId: string, areaId: string) {
    this.payload = {
      categoryId: categoryId,
      typeId: '',
      areaId: areaId,
      subjectId: ''
    }
  }
}

export class CollectionsCategoryTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_TYPE;
  payload: IdentifersPayload;

  constructor(categoryId: string, typeId: string) {
    this.payload = {
      categoryId: categoryId,
      typeId: typeId,
      areaId: '',
      subjectId: ''
    }
  }
}

export class CollectionsCategoryAreaTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE;
  payload: IdentifersPayload;

  constructor(categoryId: string, areaId: string, typeId: string) {
    this.payload = {
      categoryId: categoryId,
      areaId: areaId,
      typeId: typeId,
      subjectId: ''
    }
  }
}

export class CollectionsCategoryAreaSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA_SUBJECT;
  payload: IdentifersPayload;

  constructor(categoryId: string, areaId: string, subjectId: string) {
    this.payload = {
      categoryId: categoryId,
      areaId: areaId,
      subjectId: subjectId,
      typeId: ''
    }
  }
}

export class CollectionsCategorySubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_SUBJECT;
  payload: IdentifersPayload;

  constructor(categoryId: string, subjectId: string) {
    this.payload = {
      categoryId: categoryId,
      subjectId: subjectId,
      areaId: '',
      typeId: ''
    }
  }
}

export class CollectionsCategoryTypeSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_TYPE_SUBJECT;
  payload: IdentifersPayload;

  constructor(categoryId: string, typeId: string, subjectId: string) {
    this.payload = {
      categoryId: categoryId,
      areaId: '',
      subjectId: subjectId,
      typeId: typeId
    }
  }
}

export class CollectionsCategoryAreaTypeSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE_SUBJECT;
  payload: IdentifersPayload;

  constructor(categoryId: string, areaId: string, typeId: string, subjectId: string) {
    this.payload = {
      categoryId: categoryId,
      areaId: areaId,
      typeId: typeId,
      subjectId: subjectId
    }
  }
}

export class CollectionsTypeAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE;

  constructor(public payload: string) {

  }
}
export class CollectionsTypeAreaAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA;
  payload: IdentifersPayload;
  constructor(areaId: string, typeId: string) {
    this.payload = {
      categoryId: '',
      areaId: areaId,
      typeId: typeId,
      subjectId: ''
    }
  }
}

export class CollectionsTypeSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_SUBJECT;
  payload: IdentifersPayload;
  constructor(typeId: string, subjectId: string) {
    this.payload = {
      categoryId: '',
      areaId: '',
      typeId: typeId,
      subjectId: subjectId
    }
  }
}

export class CollectionsTypeAreaSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT;
  payload: IdentifersPayload;
  constructor(areaId: string, typeId: string, subjectId: string) {
    this.payload = {
      categoryId: '',
      areaId: areaId,
      typeId: typeId,
      subjectId: subjectId
    }
  }
}

export class CollectionActionFailed implements Action {
  type = CollectionActionTypes.REQUEST_FAILED;
  payload: void;

  constructor(err: string) {
    if (err !== 'test') {
      console.log(err);
    }
  }

}

export type CollectionActions =
  CollectionsActionSuccess |
  CollectionsAreaAction |
  CollectionReset |
  AllCollectionsAction |
  CollectionsSubjectAction |
  CollectionsAreaSubjectAction |
  CollectionsTypeAction |
  CollectionsTypeAreaAction |
  CollectionsTypeSubjectAction |
  CollectionsTypeAreaSubjectAction |
  CollectionsCategoryAreaTypeAction |
  CollectionsCategoryAreaAction |
  CollectionActionFailed;
