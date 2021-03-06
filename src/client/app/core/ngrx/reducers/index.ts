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
import { createSelector } from 'reselect';
import { ActionReducerMap} from '@ngrx/store';


/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromCollection from './collection.reducers';
import * as fromArea from './area.reducers';
import * as fromAreaList from './area-list.reducers';
import * as fromSubject from './subject.reducers';
import * as fromItem from './item.reducers';
import * as fromRelated from './related.reducers';
import * as fromAuth from './auth.reducers';
import * as fromTypes from './type.reducers';
import * as fromFilter from './filter.reducers';
import * as fromCollectionGroups from './collection-group.reducers';
import * as fromViewType from './view.reducers';
import {getAllFilters} from './filter.reducers';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  collections: fromCollection.State;
  collectionGroups: fromCollectionGroups.State;
  area: fromArea.State;
  areaList: fromAreaList.State
  subjects: fromSubject.State;
  types: fromTypes.State;
  item: fromItem.State;
  related: fromRelated.State;
  auth: fromAuth.State;
  filter: fromFilter.State;
  viewType: fromViewType.State;
}

export const reducers: ActionReducerMap<State> = {
  collections: fromCollection.reducer,
  collectionGroups: fromCollectionGroups.reducer,
  area: fromArea.reducer,
  areaList: fromAreaList.reducer,
  subjects: fromSubject.reducer,
  types: fromTypes.reducer,
  item: fromItem.reducer,
  related: fromRelated.reducer,
  auth: fromAuth.reducer,
  filter: fromFilter.reducer,
  viewType: fromViewType.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
export const getCollectionsState = (state: State) => state.collections;
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memorized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
export const getCollections = createSelector(getCollectionsState, fromCollection.getCollectionList);

export const getCollectionGroupState = (state: State) => state.collectionGroups;

export const getCollectionGroups = createSelector(getCollectionGroupState, fromCollectionGroups.getCollectionGroupList);

export const getAreasState = (state: State) => state.area;

export const getTypesState = (state: State) => state.types;

export const getTypes = createSelector(getTypesState, fromTypes.getTypesList);

export const getAreaInfo = createSelector(getAreasState, fromArea.getAreaInfo);

export const getAreaListState = (state: State) => state.areaList;

export const getAreas = createSelector(getAreaListState, fromAreaList.getAreaList);

export const getSubjectsState = (state: State) => state.subjects;

export const getSubject = createSelector(getSubjectsState, fromSubject.getSubjectList);

export const getItemState = (state: State) => state.item;

export const getItem = createSelector(getItemState, fromItem.getItem);

export const getRelatedState = (state: State) => state.related;

export const getRelated = createSelector(getRelatedState, fromRelated.getRelatedList);

export const getAuthStatusState = (state: State) => state.auth;

export const getAuthStatus = createSelector(getAuthStatusState, fromAuth.getAuthStatus);

export const getFilterState = (state: State) => state.filter;

export const getSubjectsFilter = createSelector(getFilterState, fromFilter.getSubjectsFilter);

export const getFilters = createSelector(getFilterState, getAllFilters);

export const getTypesFilter = createSelector(getFilterState, fromFilter.getTypesFilter);

export const getAreasFilter = createSelector(getFilterState, fromFilter.getAreasFilter);

export const getRemovedSubject = createSelector(getFilterState, fromFilter.getRemovedSubjectsFilter);

export const getRemovedGroup = createSelector(getFilterState, fromFilter.getRemovedGroupsFilter);

export const getRemovedType = createSelector(getFilterState, fromFilter.getRemovedTypesFilter);

export const getCollectionsGroupFilter = createSelector(getFilterState, fromFilter.getCollectionGroupFilter);

export const getCollectionFilterTerm = createSelector(getFilterState, fromFilter.getFilterTerm);

export const getFilteredCollections = createSelector(getCollections, getFilterState, filterFunction);

export const getViewTypeState = (state: State) => state.viewType;

export const getViewState = createSelector(getViewTypeState, fromViewType.getViewType);

function filterFunction(collections, filter) {
  if (typeof filter.filterTerm !== 'undefined' && filter.filterTerm.length > 2 && collections.length > 1) {
    return collections.filter(col => {
      const types = col.types.map(t => t.name);
      const collectionDescription: string = col.title + ' ' + col.description + ' ' + types;
      // catch illegal characters
      const filterTerm = filter.filterTerm.replace(/\\/g, '');
      return (new RegExp(filterTerm, 'i')).test(collectionDescription)
    });
  }
  return collections;

}
