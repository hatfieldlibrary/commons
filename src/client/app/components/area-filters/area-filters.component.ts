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
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter.type';
import {TypesFilter} from '../../shared/data-types/types-filter';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {RemoveSelectedSubjects} from '../../actions/filter.actions';


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

  @Output() removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() filters: fromFilter.State;
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
    this.filters.selectedGroups.forEach(grp => {
      if (grp.id !== 0) {
        const activeIndex = this.groups.groups.findIndex(a => a.id === grp.id);
        if (activeIndex >= 0) {
          this.normalizedFilter.push({type: 'group', name: grp.name, id: grp.id, active: true});
        } else {
          this.normalizedFilter.push({type: 'group', name: grp.name, id: grp.id, active: false})
        }
      }
    });
  }

  private updateTypeFilter(): void {
    const updatedTypes = [];
    this.filters.selectedTypes.forEach(type => {
      if (type.id !== 0) {
        const activeIndex = this.types.types.findIndex(a => a.id === type.id);
        if (activeIndex >= 0) {
          updatedTypes.push({id: type.id, name: type.name});
          this.normalizedFilter.push({type: 'type', name: type.name, id: type.id, active: true});
        } else {
          this.normalizedFilter.push({type: 'type', name: type.name, id: type.id, active: false})
        }
      }
    });

  }

  private updateSubjectFilter(): void {
    const updatedSubjects = [];
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
    // If subjects were removed, then also update the store. The next time a subject option is
    // chosen, the navigation service will use the store to modify the route.
    if (updatedSubjects.length > 0) {
      // Set initialized to true so ngChanges will not call again. Otherwise, the store dispatch
      // creates a loop.
      this.initialized = true;
      this.store.dispatch(new RemoveSelectedSubjects(updatedSubjects));
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
