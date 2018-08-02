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

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import * as fromFilter from '../../reducers/filter.reducers';
import {Subscription} from 'rxjs/Subscription';
import {NormalizedFilter} from '../../shared/data-types/normalized-filter';
import {SubjectFilter} from '../../shared/data-types/subject-filter';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter';
import {TypesFilter} from '../../shared/data-types/types-filter';

import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import {FieldValues} from '../../shared/enum/field-names';
import {RemoveSelectedGroups, RemoveSelectedSubjects, RemoveSelectedTypes} from '../../actions/filter.actions';


export interface DeselectedFilter {
  type: string,
  id: number
}

/**
 * This component displays currently selected filters and allows the user to deselect a filter.
 *
 * An additional behavior is to indicate when a selected field is not available after a navigation
 * choice (e.g. a selected subject is no longer available after the user has refined the search with a
 * content type).
 *
 * For the later behavior, the component also updates application state directly, adding removed fields
 * to the filter object. The navigation service (singleton) subscribes to the filter. Before navigation
 * removes any field in the removed filters list.
 */
@Component({
  selector: 'app-area-filters',
  templateUrl: './area-filters.component.html',
  styleUrls: ['./area-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AreaFiltersComponent implements OnChanges, OnDestroy {

  @Output()
  removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  filters: fromFilter.State;
  @Input()
  subjects: SubjectFilter;
  @Input()
  groups: CollectionGroupFilter;
  @Input()
  types: TypesFilter;
  watcher: Subscription;
  isMobile = false;
  /**
   * This array is bound to the template.
   */
  normalizedFilter: NormalizedFilter[] = [];
  /**
   * This member variable is used to trigger a reset of the
   * normalizedFilter array.
   * @type {number}
   */
  resetCount = 0;

  constructor(private store: Store<fromRoot.State>,
              private media: ObservableMedia) {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  /**
   * Returns boolean for *ngIf conditional. Returns true if
   * the filter in the the filter list is marked as inactive.
   * @param filter
   * @returns {boolean}
   */
  isFilterInActive(filter): boolean {
    return !filter.active;
  }

  /**
   * If the selected filter is not in the list of available filters, sets
   * status to inactive.
   */
  private updateFilter(fieldList: FieldFilterType[], selectedFields: FieldFilterType[], type: FieldValues): void {
    const updatedFields = [];
    if (fieldList && fieldList.length > 0) {
      selectedFields.forEach(sub => {
        if (sub.id !== 0) {
          const activeIndex = fieldList.findIndex(a => a.id === sub.id);
          if (activeIndex >= 0) {
            this.normalizedFilter.push({type: type, name: sub.name, id: sub.id, active: true});
          } else {
            updatedFields.push({id: sub.id, name: sub.name});
            this.normalizedFilter.push({type: type, name: sub.name, id: sub.id, active: false})
          }
        }
      });
      if (updatedFields.length > 0) {
        this.updateStore(type, updatedFields);
      }
    }
  }

  /**
   * This function adds removed fields to the corresponding field state. The updated state
   * is used to adjust the url for the subsequent router call.
   * @param {string} fieldType
   * @param {FieldFilterType[]} data
   */
  private updateStore(fieldType: string, data: FieldFilterType[]) {
    // If fields were removed, update the store. The next time the corresponding field option is
    // chosen, the navigation service will use the revised store to modify the route.
    if (data && data.length > 0) {
      switch (fieldType) {
        case FieldValues.SUBJECT: {
          this.store.dispatch(new RemoveSelectedSubjects(data));
          break;
        }
        case FieldValues.TYPE: {
          this.store.dispatch(new RemoveSelectedTypes(data));
          break;
        }
        case FieldValues.GROUP: {
          this.store.dispatch(new RemoveSelectedGroups(data));
          break;
        }
        default: {
          console.log('Invalid choice');
          break;
        }
      }
    }
  }

  /**
   * Deselects the filter
   * @param type the type of filter to be removed
   * @param id the id of the filter to be removed
   */
  deselect(type, id, active): void {
    if (active) {
      const deselected: DeselectedFilter = {type: type, id: id};
      this.removeFilter.emit(deselected);
    }
  }

  /**
   * Angular change detection will be invoked for each of
   * the type, subject and group inputs. So we can anticipate
   * that this counter function will be called 3 times. Set
   * the bound filter array to an empty list when the function
   * is called with the counter member variable at 0.  Reset
   * the counter member variable to 0 when the count reaches 3.
   *
   * It would be nice to find a better way, but this appears to
   * be the only reliable option for responding to changes.
   */
  private resetCounter() {
    if (this.resetCount === 0) {
      this.normalizedFilter = [];
    }
    this.resetCount++;
    if (this.resetCount === 3) {
      this.resetCount = 0;
    }
  }


  /**
   * Since Angular chooses to reuse this component on subsequent
   * routing events, let's use ngOnChanges to trigger creation of the
   * filters array.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.types) {
      this.resetCounter();
      if (changes.types.previousValue !== changes.types.currentValue) {
        this.updateFilter(this.types.types, this.filters.selectedTypes, FieldValues.TYPE);
      }
    }
    if (changes.subjects) {
      this.resetCounter();
      if (changes.subjects.previousValue !== changes.subjects.currentValue) {
        this.updateFilter(this.subjects.subjects, this.filters.selectedSubjects, FieldValues.SUBJECT)
      }
    }
    if (changes.groups) {
      this.resetCounter();
      if (changes.groups.previousValue !== changes.groups.currentValue) {
        this.updateFilter(this.groups.groups, this.filters.selectedGroups, FieldValues.GROUP)
      }
    }

  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
