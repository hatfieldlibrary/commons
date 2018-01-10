
import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';

export const FilterActionTypes = {
  SET_SEARCH_FILTER: type('[Filters] Set Search Filter'),
  CLEAR_SEARCH_FILTER: type('[Filters] Clear Search Filter'),
  SET_AREA_FILTER: type('[Filters] Set Areas Filter'),
  SET_TYPE_FILTER: type('[Filters] Set Types Filter'),
  SET_SUBJECT_FILTER: type('[Filters] Set Subject Filter'),
  REMOVE_SUBJECT_FILTER: type('[Filter] Remove Subject Filter')
};

export class SetSearchFilter implements Action {
  public type = FilterActionTypes.SET_SEARCH_FILTER;
  constructor (public payload: string) {}
}

