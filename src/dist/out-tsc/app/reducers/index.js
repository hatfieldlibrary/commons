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
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
// const reducers = {
//   collections: fromCollection.reducer,
//   area: fromArea.reducer,
//   areaList: fromAreaList.reducer,
//   subjects: fromSubject.reducer,
//   item: fromItem.reducer,
//   related: fromRelated.reducer,
//   auth: fromAuth.reducer
// };
//const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
//const productionReducer: ActionReducer<State> = combineReducers(reducers);
//export function reducer(state: any, action: any) {
// if (environment.production) {
//  return productionReducer(state, action);
// }
// else {
//  return developmentReducer(state, action);
// }
//}
export var reducers = {
    collections: fromCollection.reducer,
    area: fromArea.reducer,
    areaList: fromAreaList.reducer,
    subjects: fromSubject.reducer,
    item: fromItem.reducer,
    related: fromRelated.reducer,
    auth: fromAuth.reducer
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
export var getCollectionssState = function (state) { return state.collections; };
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
export var getCollections = createSelector(getCollectionssState, fromCollection.getCollectionList);
export var getAreasState = function (state) { return state.area; };
export var getAreaInfo = createSelector(getAreasState, fromArea.getAreaInfo);
export var getAreaListState = function (state) { return state.areaList; };
export var getAreas = createSelector(getAreaListState, fromAreaList.getAreaList);
export var getSubjectsState = function (state) { return state.subjects; };
export var getSubject = createSelector(getSubjectsState, fromSubject.getSubjectList);
export var getSelectedSubject = createSelector(getSubjectsState, fromSubject.getSelectedSubject);
export var getItemState = function (state) { return state.item; };
export var getItem = createSelector(getItemState, fromItem.getItem);
export var getRelatedState = function (state) { return state.related; };
export var getRelated = createSelector(getRelatedState, fromRelated.getRelatedList);
export var getAuthStatusState = function (state) { return state.auth; };
export var getAuthStatus = createSelector(getAuthStatusState, fromAuth.getAuthStatus);
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/reducers/index.js.map