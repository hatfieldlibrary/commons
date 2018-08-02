import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {Observable} from 'rxjs/Observable';
import {FieldFilterType} from '../shared/data-types/field-filter.type';
import * as fromFilter from '../reducers/filter.reducers';
import {AreaType} from '../shared/data-types/area.type';
import {TypesFilter} from '../shared/data-types/types-filter';
import {CollectionType} from '../shared/data-types/collection.type';
import {SubjectFilter} from '../shared/data-types/subject-filter';
import {CollectionGroupFilter} from '../shared/data-types/collection-group-filter';
import {AreasFilter} from '../shared/data-types/areas-filter';

/**
 * This service subscribes to the application Store and provides methods
 * for retrieving observables.  Intended primarily for use with the ListContainerComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private areas: Observable<FieldFilterType[]> = this.store.select(fromRoot.getAreas);

  private areaInfo: Observable<AreaType> = this.store.select(fromRoot.getAreaInfo);

  private filters: Observable<fromFilter.State> = this.store.select(fromRoot.getFilters);

  private viewType: Observable<string> = this.store.select(fromRoot.getViewState);

  private collections: Observable<CollectionType[]> =
    Observable.combineLatest(
      this.store.select(fromRoot.getFilteredCollections),
      (collections) => {
        return collections;
      }
    );

  private areasFilter: Observable<AreasFilter> =
    Observable.combineLatest(
      this.store.select(fromRoot.getAreas),
      this.store.select(fromRoot.getAreasFilter),
      (areas, selected) => {
        return {
          areas: areas,
          selectedAreas: selected
        }
      }
    );

  private typesFilter: Observable<TypesFilter> = Observable.combineLatest(
    this.store.select(fromRoot.getTypes),
    this.store.select(fromRoot.getTypesFilter),
    (types, selected) => {
      return {
        types: types,
        selectedTypes: selected
      }
    }
  );

  private subjectsFilter: Observable<SubjectFilter> =
    Observable.combineLatest(
      this.store.select(fromRoot.getSubject),
      this.store.select(fromRoot.getSubjectsFilter),
      (subjects, selected) => {
        return {
          subjects: subjects,
          selectedSubjects: selected
        }
      }
    );

  private groupsFilter: Observable<CollectionGroupFilter> =
    Observable.combineLatest(
      this.store.select(fromRoot.getCollectionGroups),
      this.store.select(fromRoot.getCollectionsGroupFilter),
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
