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

import { Injectable } from '@angular/core';
import * as filterActions from '../ngrx/actions/filter.actions';
import * as fromRoot from '../ngrx/reducers';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {FieldFilterType} from '../data-types/field-filter.type';

/**
 * This service initializes the selected fields on route navigation.
 */
@Injectable()
export class SetSelectedService {

  subjects$: Observable<FieldFilterType[]>;
  areas$: Observable<FieldFilterType[]>;
  types$: Observable<FieldFilterType[]>;
  groups$: Observable<FieldFilterType[]>;
  watchers: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.subjects$ = this.store.select(fromRoot.getSubject);
    this.areas$ = this.store.select(fromRoot.getAreas);
    this.types$ = this.store.select(fromRoot.getTypes);
    this.groups$ = this.store.select(fromRoot.getCollectionGroups);
    this.watchers = new Subscription();
  }

  /**
   * Adds a subscription to the subject list. The callback function uses the subjectId
   * to create the array of selected subject. Updates the store.
   *
   * @param {string} subjectId comma separated string of subject ids.
   * @private
   */
  setSelectedSubject(subjectId: string): void {

    if (subjectId) {
      const subsWatcher = this.subjects$.subscribe((subs) => {
        const filtersArr = subjectId.split(',');
        const selectedSubs: FieldFilterType[] = [];
        filtersArr.forEach(function (singleSubId) {
          const selected = subs.find((sub) => sub.id === +singleSubId);
          if (selected) {
            selectedSubs.push(selected);
          }
        });
        if (selectedSubs.length > 0) {
          this.store.dispatch(new filterActions.SetSubjectFilter(selectedSubs));
        }
      });
      this.watchers.add(subsWatcher);
    } else {
      this.store.dispatch(new filterActions.SetSubjectFilter([{id: 0, name: ''}]))
    }
  }

  /**
   * Adds a subscription to the area list. The callback function uses the areaId
   * to create the array of selected areas. Updates the store.
   *
   * @param {string} areaId comma separated string of area ids.
   */
  setSelectedArea(areaId: string): void {
    if (areaId) {
      const areasWatcher = this.areas$.subscribe((areas) => {
        const areaArr = areaId.split(',');
        const selectedAreas: FieldFilterType[] = [];
        areaArr.forEach(function (singleAreaId) {
          const selected = areas.find((area) => area.id === +singleAreaId);
          if (selected) {
            selectedAreas.push(selected);
          }
        });
        if (selectedAreas.length > 0) {
          this.store.dispatch(new filterActions.SetAreaFilter(selectedAreas));
        } else {
          this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, name: ''}]));
        }
      });
      this.watchers.add(areasWatcher);
    } else {
      this.store.dispatch(new filterActions.SetAreaFilter([{id: 0, name: ''}]))
    }
  }

  /**
   * Adds a subscription to the type list. The callback function uses the typeId
   * to create the array of selected types. Updates the store.
   *
   * @param {string} typeId comma separated string of type ids.
   */
  setSelectedTypes(typeId: string): void {

    if (typeId) {
      const typesWatcher = this.types$.subscribe((types) => {
        const filtersArr = typeId.split(',');
        const selectedTypes: FieldFilterType[] = [];
        filtersArr.forEach(function (singleTypeId) {
          const selected = types.find((type) => type.id === +singleTypeId);
          if (selected) {
            selectedTypes.push(selected);
          }
        });
        if (selectedTypes.length > 0) {
          this.store.dispatch(new filterActions.SetTypeFilter(selectedTypes));
        }
      });
      this.watchers.add(typesWatcher);
    } else {
      this.store.dispatch(new filterActions.SetTypeFilter([{id: 0, name: ''}]))
    }
  }

  /**
   * Adds a subscription to the collection group list. The callback function uses the groupId
   * to create the array of selected groups. Updates the store.
   *
   * @param {string} groupId comma separated string of group ids.
   */
  setSelectedGroups(groupId: string): void {
    if (groupId) {
      const groupsWatcher = this.groups$.subscribe((groups) => {
        const groupArr = groupId.split(',');
        const selectedGroups: FieldFilterType[] = [];
        groupArr.forEach(function (singleGroupId) {
          const selected = groups.find((grp) => grp.id === +singleGroupId);
          if (selected) {
            selectedGroups.push(selected);
          }
        });
        if (selectedGroups.length > 0) {
          this.store.dispatch(new filterActions.SetGroupFilter(selectedGroups));
        } else {
          this.store.dispatch(new filterActions.SetGroupFilter([{id: 0, name: ''}]));
        }
      });
      this.watchers.add(groupsWatcher);
    } else {
      this.store.dispatch(new filterActions.SetGroupFilter([{id: 0, name: ''}]))
    }
  }

  unsubscribe(): void {
    this.watchers.unsubscribe();
  }
}
