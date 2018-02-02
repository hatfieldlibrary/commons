import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromFilter from '../../reducers/filter.reducers';
import {Observable} from 'rxjs/Observable';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {NormalizedFilter} from '../../shared/data-types/normalized-filter';

export interface DeselectedFilter {
  type: string,
  id: number
}

@Component({
  selector: 'app-current-filters',
  templateUrl: './current-filters.component.html',
  styleUrls: ['./current-filters.component.css']
})
export class CurrentFiltersComponent implements OnInit {

  @Output() removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() previousAreas: AreaFilterType[];
  filters$: Observable<fromFilter.State>;
  areas: AreaFilterType[];
  types: TypesFilterType[];
  normalizedFilter: NormalizedFilter[];

  constructor(private store: Store<fromRoot.State>) { }

  /**
   * Returns boolean for the *ngIf conditional. If true,
   * the component will show the element.
   * @returns {boolean}
   */
  isFilterSelected(): boolean {
    return (this.areas.length > 0 || this.types.length > 0);
  }

  isFilterInActive(filter): boolean {
    return !filter.active;
  }

  private setFilteredAreaState(areas) {
    this.previousAreas.forEach(area => {
      const activeListIndex = areas.findIndex(a => a.id === area.id)
      if (activeListIndex >= 0) {
        this.normalizedFilter.push({type: 'area', name: area.title, id: area.id, active: true});
      } else {
        console.log('adding inactive area to list: ' + area.title)
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
    if (areas.length < this.previousAreas.length) {
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

  ngOnInit() {
    this.filters$ = this.store.select(fromRoot.getFilters);
    this.filters$.subscribe(filter => {
      this.areas = filter.selectedAreas;
      this.previousAreas = filter.previousAreas;
      this.types = filter.selectedTypes;
      this.normalizedFilter = [];
      this.createNormalizedFilter(this.areas, this.types);
    });
  }

}
