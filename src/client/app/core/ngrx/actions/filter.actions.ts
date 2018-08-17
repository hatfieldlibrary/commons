
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


export const FilterActionTypes = {
  SET_SEARCH_FILTER: type('[Filters] Set Search Filter'),
  CLEAR_SEARCH_FILTER: type('[Filters] Clear Search Filter'),
  SET_AREA_FILTER: type('[Filters] Set Areas Filter'),
  SET_DEFAULT_AREA_FILTER: type('[Filters] Reset to default area'),
  SET_TYPE_FILTER: type('[Filters] Set Types Filter'),
  SET_DEFAULT_TYPE_FILTER: type('[Filters] Set default type filter'),
  SET_SUBJECT_FILTER: type('[Filters] Set Subject Filter'),
  REMOVE_SUBJECT_FILTER: type('[Filter] Remove Subject Filter'),
  SET_GROUP_FILTER: type('[Filters] Set filter for collection groups'),
  REMOVE_SELECTED_SUBJECT: type('[Filters] Adding removed  subjects'),
  REMOVE_SELECTED_TYPE: type('[Filters] Adding removed types'),
  REMOVE_SELECTED_GROUP: type('[Filters] Adding removed groups'),
};

export class RemoveSelectedSubjects implements Action {
  type = FilterActionTypes.REMOVE_SELECTED_SUBJECT;
  constructor(public payload: FieldFilterType[]) {}
}

export class RemoveSelectedTypes implements Action {
  type = FilterActionTypes.REMOVE_SELECTED_TYPE;
  constructor(public payload: FieldFilterType[]) {}
}

export class RemoveSelectedGroups implements Action {
  type = FilterActionTypes.REMOVE_SELECTED_GROUP;
  constructor(public payload: FieldFilterType[]) {}
}

/**
 * Redux action for setting the current search filter term.
 */
export class SetSearchFilter implements Action {
  public type = FilterActionTypes.SET_SEARCH_FILTER;
  constructor (public payload: string) {}
}

/**
 * Redux action for removing the current search filter term.
 */
export class ClearSearchFilter implements Action {
  public type = FilterActionTypes.CLEAR_SEARCH_FILTER;
  public payload = '';
  constructor() {}
}

/**
 * Redux action for setting the array of currently filtered areas.
 */
export class SetAreaFilter implements Action {
  public type = FilterActionTypes.SET_AREA_FILTER;
  constructor(public payload: FieldFilterType[]) {}
}

/**
 * Redux action for resetting the area filter to the default
 * all areas setting.
 */
export class SetDefaultAreaFilter implements Action {
  public type = FilterActionTypes.SET_DEFAULT_AREA_FILTER;
  public payload;
  constructor() {}
}

/**
 * Redux action for setting the selected subject filter value.
 */
export class SetSubjectFilter implements Action {
  public type = FilterActionTypes.SET_SUBJECT_FILTER;
  constructor(public payload: FieldFilterType[]) {}
}

/**
 * Redux action for setting the selected subject to default state.
 */
export class RemoveSubjectFilter implements Action {
  public type = FilterActionTypes.REMOVE_SUBJECT_FILTER;
  public payload = [{id: 0, name: ''}];
  constructor() {}
}

/**
 * Redux action for setting the selected type filter value.
 */
export class SetTypeFilter implements Action {
  public type = FilterActionTypes.SET_TYPE_FILTER;
  constructor(public payload: FieldFilterType[]) {}
}

/**
 * Redux action for setting the selected type filter value
 * to the default value.
 */
export class SetDefaultTypeFilter implements Action {
  public type = FilterActionTypes.SET_DEFAULT_TYPE_FILTER;
  public payload;
  constructor() {}
}

/**
 * Redux action for setting the selected collection group filter value.
 */
export class SetGroupFilter implements Action {
  public type = FilterActionTypes.SET_GROUP_FILTER;
  constructor(public payload: FieldFilterType[]) {}
}


/**
 * Union type.
 */
export type FilterActions =
  SetSearchFilter |
  RemoveSelectedSubjects |
  ClearSearchFilter |
  SetAreaFilter |
  SetSubjectFilter |
  RemoveSubjectFilter |
  SetTypeFilter |
  SetGroupFilter;
