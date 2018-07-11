
import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import {SubjectType} from '../shared/data-types/subject.type';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {CollectionGroupFilter} from '../shared/data-types/collection-group-filter.type';
import {CollectionGroupType} from '../shared/data-types/collection-group-type';
import {SubjectActionTypes} from './subject-actions';

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
  REMOVE_SELECTED_SUBJECT: type('[SubjectType] Remove selected subject'),
};

export class RemoveSelectedSubjects implements Action {
  type = FilterActionTypes.REMOVE_SELECTED_SUBJECT;
  constructor(public payload: SubjectType[]) {
    console.log(payload)
  }
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
  constructor(public payload: AreaFilterType[]) {}
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
  constructor(public payload: SubjectType[]) {}
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
  constructor(public payload: TypesFilterType[]) {console.log(payload)}
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
  constructor(public payload: CollectionGroupType[]) {console.log(payload)}
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
