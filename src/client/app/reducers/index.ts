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
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import { environment } from '../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {combineReducers} from '@ngrx/store';

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

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  collections: fromCollection.State;
  area: fromArea.State;
  areaList: fromAreaList.State
  subjects: fromSubject.State;
  item: fromItem.State;
  related: fromRelated.State;
  auth: fromAuth.State;

}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  collections: fromCollection.reducer,
  area: fromArea.reducer,
  areaList: fromAreaList.reducer,
  subjects: fromSubject.reducer,
  item: fromItem.reducer,
  related: fromRelated.reducer,
  auth: fromAuth.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
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
export const getCollectionssState = (state: State) => state.collections;
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
export const getCollections = createSelector(getCollectionssState, fromCollection.getCollectionList);

export const getAreasState = (state: State) => state.area;

export const getAreaInfo = createSelector(getAreasState, fromArea.getAreaInfo);

export const getAreaListState = (state: State) => state.areaList;

export const getAreas = createSelector(getAreaListState, fromAreaList.getAreaList);

export const getSubjectsState = (state: State) => state.subjects;

export const getSubject = createSelector(getSubjectsState, fromSubject.getSubjectList);

export const getSelectedSubject = createSelector(getSubjectsState, fromSubject.getSelectedSubject);

export const getItemState = (state: State) => state.item;

export const getItem = createSelector(getItemState, fromItem.getItem);

export const getRelatedState = (state: State) => state.related;

export const getRelated = createSelector(getRelatedState, fromRelated.getRelatedList);

export const getAuthStatusState = (state: State) => state.auth;

export const getAuthStatus = createSelector(getAuthStatusState, fromAuth.getAuthStatus);

