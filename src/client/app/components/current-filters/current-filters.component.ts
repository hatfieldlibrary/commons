import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output,
  SimpleChanges
} from '@angular/core';
import * as fromFilter from '../../reducers/filter.reducers';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {NormalizedFilter} from '../../shared/data-types/normalized-filter';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

export interface DeselectedFilter {
  type: string,
  id: number
}

@Component({
  selector: 'app-current-filters',
  templateUrl: './current-filters.component.html',
  styleUrls: ['./current-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentFiltersComponent implements OnChanges, OnDestroy {

  @Output() removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() filters: fromFilter.State;
  areas: AreaFilterType[];
  types: TypesFilterType[];
  normalizedFilter: NormalizedFilter[];
  watcher: Subscription;
  isMobile = false;

  constructor(private media: ObservableMedia) {
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
  isFilterSelected(): boolean {
    return (this.areas.length > 0 || this.types.length > 0);
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
   * Sets the active field to true or false based on whether an
   * item from the current array is present in the previous filter
   * array.  This is used to set the status of the filter in the
   * view.
   * @param areas
   */
  private setFilteredAreaState(areas) {
    this.filters.previousAreas.forEach(area => {
      const activeListIndex = areas.findIndex(a => a.id === area.id)
      if (activeListIndex >= 0) {
        this.normalizedFilter.push({type: 'area', name: area.title, id: area.id, active: true});
      } else {
        this.normalizedFilter.push({type: 'area', name: area.title, id: area.id, active: false})
      }
    })
  }
  /**
   * Creates an object the implements the exported interface
   * for deselected filters.
   * @param areas the currently selected areas
   * @param types the currently selected types
   */
  createNormalizedFilter(areas, types) {
    if (areas.length < this.filters.previousAreas.length) {
      this.setFilteredAreaState(areas);
    } else {
      areas.forEach(area => {
        if (area.id !== 0) {
          this.normalizedFilter.push({type: 'area', name: area.title, id: area.id, active: true})
        }
      });
    }
    types.forEach(type => {
      if (type.id !== 0) {
        this.normalizedFilter.push({type: 'type', name: type.name, id: type.id, active: true})
      }
    });
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
    this.normalizedFilter = [];
    this.createNormalizedFilter(this.filters.selectedAreas, this.filters.selectedTypes);
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
