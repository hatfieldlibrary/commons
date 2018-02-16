import { Injectable } from '@angular/core';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {RemoveSubjectFilter, SetSubjectFilter} from '../actions/filter.actions';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import * as filterActions from '../actions/filter.actions';
import * as fromRoot from '../reducers';
import {Observable} from 'rxjs/Observable';
import {SubjectType} from '../shared/data-types/subject.type';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SetSelectedService {

  subjects$: Observable<SubjectType[]>;
  areas$: Observable<AreaFilterType[]>;
  types$: Observable<TypesFilterType[]>;
  watchers: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.types$ = this.store.select(fromRoot.getTypes);
    this.watchers = new Subscription();
  }

  /**
   * Dispatches action to set the selected subject after the subject list subscription
   * tells us that subjects are available.
   * @param {string} subjectId
   * @private
   */
  setSelectedSubject(subjectId: string): void {
    if (subjectId) {
      const subjectWatcher = this.subjects$.subscribe((subjects) => {
        subjects.forEach((subject) => {
          if (subject.id === +subjectId) {
            this.store.dispatch(new SetSubjectFilter(subject));
          }
        })
      });
      this.watchers.add(subjectWatcher);
    } else {
      this.store.dispatch(new RemoveSubjectFilter());
    }
  }

  /**
   * Adds a watcher for the area list. The callback function uses the provided areaId
   * to create an array of selected areas from the current list of areas. The selected
   * areas are dispatched to the store. This initializes the selected areas on page load.
   *
   * @param {string} areaId comma separated string of area ids.
   */
  setSelectedArea(areaId: string): void {
    if (areaId) {
      const areasWatcher = this.areas$.subscribe((areas) => {
        const areaArr = areaId.split(',');
        const selectedAreas: AreaFilterType[] = [];
        areaArr.forEach(function (singleAreaId) {
          const selected = areas.find((area) => area.id === +singleAreaId);
          if (selected) {
            selectedAreas.push(selected);
          }
        });
        if (selectedAreas.length > 0) {
          this.store.dispatch(new filterActions.SetAreaFilter(selectedAreas));
        } else {
          this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, title: '', count: 0}]));
        }
        this.watchers.add(areasWatcher);
      });
    } else {
      this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, title: '', count: 0}]))
    }
  }

  /**
   * Adds a watcher for the type list. The callback function uses the provided typeId
   * to create an array of selected types from the current list of types. The selected
   * types are dispatched to the store. This initializes the selected types on page load.
   *
   * @param {string} typeId comma separated string of area ids.
   */
  setSelectedTypes(typeId: string): void {
    if (typeId) {
      const typesWatcher = this.types$.subscribe((types) => {
        const filtersArr = typeId.split(',');
        const selectedTypes: TypesFilterType[] = [];
        filtersArr.forEach(function (singleTypeId) {
          const selected = types.find((type) => type.id === +singleTypeId);
          if (selected) {
            selectedTypes.push(selected);
          }
        });
        if (selectedTypes.length > 0) {
          this.store.dispatch(new filterActions.SetTypeFilter(selectedTypes));
        }
        this.watchers.add(typesWatcher);
      });
    } else {
      this.store.dispatch(new filterActions.SetTypeFilter([{id: 0, name: ''}]))
    }
  }

  unsubscribe(): void {
    this.watchers.unsubscribe();
  }
}
