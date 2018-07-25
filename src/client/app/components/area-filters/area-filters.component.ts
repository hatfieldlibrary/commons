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

@Component({
  selector: 'app-area-filters',
  templateUrl: './area-filters.component.html',
  styleUrls: ['./area-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  normalizedFilter: NormalizedFilter[];
  watcher: Subscription;
  isMobile = false;
  initialized = false;

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
   * Returns boolean for *ngIf conditional. If true,
   * the component will show the element.
   * @returns {boolean}
   */
// isFilterSelected(): boolean {
//   return (this.areas.length > 0 || this.types.length > 0);
// }

  /**
   * Returns boolean for *ngIf conditional. Returns true if
   * the filter in the the filter list is marked as inactive.
   * @param filter
   * @returns {boolean}
   */
  isFilterInActive(filter): boolean {
    return !filter.active;
  }

  private updateGroupFilter(): void {
    const updatedGroups = [];
    if (this.groups.groups && this.groups.groups.length > 0) {
      this.filters.selectedGroups.forEach(grp => {
        if (grp.id !== 0) {
          const activeIndex = this.groups.groups.findIndex(g => g.id === grp.id);
          if (activeIndex >= 0) {
            this.normalizedFilter.push({type: 'group', name: grp.name, id: grp.id, active: true});
          } else {
            updatedGroups.push({id: grp.id, name: grp.name});
            this.normalizedFilter.push({type: 'group', name: grp.name, id: grp.id, active: false})
          }
        }
      });
      if (updatedGroups.length > 0) {
        this.initialized = true;
        this.updateRouterNavigation(FieldValues.GROUP, updatedGroups);
      }
    }
  }

  private updateTypeFilter(): void {
    const updatedTypes = [];
    if (this.types.types && this.types.types.length > 0) {
      this.filters.selectedTypes.forEach(type => {
        if (type.id !== 0) {
          const activeIndex = this.types.types.findIndex(a => a.id === type.id);
          if (activeIndex >= 0) {
            this.normalizedFilter.push({type: 'type', name: type.name, id: type.id, active: true});
          } else {
            updatedTypes.push({id: type.id, name: type.name});
            this.normalizedFilter.push({type: 'type', name: type.name, id: type.id, active: false})
          }
        }
      });
      if (updatedTypes.length > 0) {
        this.initialized = true;
        this.updateRouterNavigation(FieldValues.TYPE, updatedTypes);
      }
    }
  }

  private updateSubjectFilter(): void {

    const updatedSubjects = [];
    if (this.subjects.subjects && this.subjects.subjects.length > 0) {
      this.filters.selectedSubjects.forEach(sub => {
        if (sub.id !== 0) {
          const activeIndex = this.subjects.subjects.findIndex(a => a.id === sub.id);
          if (activeIndex >= 0) {
            this.normalizedFilter.push({type: 'subject', name: sub.name, id: sub.id, active: true});
          } else {
            updatedSubjects.push({id: sub.id, name: sub.name});
            this.normalizedFilter.push({type: 'subject', name: sub.name, id: sub.id, active: false})
          }
        }
      });
      if (updatedSubjects.length > 0) {
        this.initialized = true;
        this.updateRouterNavigation(FieldValues.SUBJECT, updatedSubjects);
      }
    }
  }

  /**
   * This function adds removed fields to the corresponding state. The updated state
   * is used to adjust the url for the subsequent router call.
   * @param {string} fieldType
   * @param {FieldFilterType[]} data
   */
  private updateRouterNavigation(fieldType: string, data: FieldFilterType[]) {
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
   * Since Angular chooses to reuse this component on subsequent
   * routing events, use ngOnChanges to trigger creation of the
   * filters array after an input change.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.normalizedFilter = [];
      this.updateSubjectFilter();
      this.updateGroupFilter();
      this.updateTypeFilter();
    }
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
