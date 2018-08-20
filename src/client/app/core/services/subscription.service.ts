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


import {combineLatest as observableCombineLatest, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../ngrx/reducers';
import {FieldFilterType} from '../data-types/field-filter.type';
import * as fromFilter from '../ngrx/reducers/filter.reducers';
import {AreaType} from '../data-types/area.type';
import {TypesFilter} from '../data-types/types-filter';
import {CollectionType} from '../data-types/collection.type';
import {SubjectFilter} from '../data-types/subject-filter';
import {CollectionGroupFilter} from '../data-types/collection-group-filter';
import {AreasFilter} from '../data-types/areas-filter';

/**
 * This service subscribes to the application Store and provides methods
 * for retrieving observables.  Intended primarily for use with the ListContainerComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private areas: Observable<FieldFilterType[]> = this.store.pipe(select(fromRoot.getAreas));

  private areaInfo: Observable<AreaType> = this.store.pipe(select(fromRoot.getAreaInfo));

  private filters: Observable<fromFilter.State> = this.store.pipe(select(fromRoot.getFilters));

  private viewType: Observable<string> = this.store.pipe(select(fromRoot.getViewState));

  private collections: Observable<CollectionType[]> =
    observableCombineLatest(
      this.store.pipe(select(fromRoot.getFilteredCollections)),
      (collections) => {
        return collections;
      }
    );

  private areasFilter: Observable<AreasFilter> =
    observableCombineLatest(
      this.store.pipe(select(fromRoot.getAreas)),
      this.store.pipe(select(fromRoot.getAreasFilter)),
      (areas, selected) => {
        return {
          areas: areas,
          selectedAreas: selected
        }
      }
    );

  private typesFilter: Observable<TypesFilter> = observableCombineLatest(
    this.store.pipe(select(fromRoot.getTypes)),
    this.store.pipe(select(fromRoot.getTypesFilter)),
    (types, selected) => {
      return {
        types: types,
        selectedTypes: selected
      }
    }
  );

  private subjectsFilter: Observable<SubjectFilter> =
    observableCombineLatest(
      this.store.pipe(select(fromRoot.getSubject)),
      this.store.pipe(select(fromRoot.getSubjectsFilter)),
      (subjects, selected) => {
        return {
          subjects: subjects,
          selectedSubjects: selected
        }
      }
    );

  private groupsFilter: Observable<CollectionGroupFilter> =
    observableCombineLatest(
      this.store.pipe(select(fromRoot.getCollectionGroups)),
      this.store.pipe(select(fromRoot.getCollectionsGroupFilter)),
      (groups, selected) => {
        return {
          groups: groups,
          selectedGroups: selected
        }
      }
    );


  constructor(private store: Store<fromRoot.State>) {
  }

  getCollectionState(): Observable<CollectionType[]> {
    return this.collections;
  }

  getAreasState(): Observable<FieldFilterType[]> {
    return this.areas;
  }

  getFilterState(): Observable<fromFilter.State> {
    return this.filters;
  }

  getTypesFilterState(): Observable<TypesFilter> {
    return this.typesFilter;
  }

  getSubjectsFilterState(): Observable<SubjectFilter> {
    return this.subjectsFilter;
  }

  getGroupsFilterState(): Observable<CollectionGroupFilter> {
    return this.groupsFilter;
  }

  getAreasFilterState(): Observable<AreasFilter> {
    return this.areasFilter;
  }

  getAreaInfoState(): Observable<AreaType> {
   return this.areaInfo;
  }

  getViewTypeState(): Observable<string> {
    return this.viewType;
  }

}
