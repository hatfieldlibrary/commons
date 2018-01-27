import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromFilter from '../../reducers/filter.reducers';
import {Observable} from 'rxjs/Observable';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {NormalizedFilter} from '../../shared/data-types/normalized-filter';
import {SetAreaFilter, SetTypeFilter} from '../../actions/filter.actions';

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
  filters$: Observable<fromFilter.State>;
  areas: AreaFilterType[];
  types: TypesFilterType[];
  normalizedFilter: NormalizedFilter[];

  constructor(private store: Store<fromRoot.State>) { }

  /**
   * Generates the comma-separated list of ids.
   * @param {any[]} list list of areas
   * @returns {string}
   */
  private getIds(list: any[]): string {
    let ids = '';
    if (typeof list !== 'undefined' && typeof list[0] !== 'undefined') {
      list.forEach(area => {
        ids = ids + area.id + ','
      });
    }
    return ids.slice(0, -1);
  }

  /**
   * Returns boolean for the *ngIf conditional. If true,
   * the component will show the element.
   * @returns {boolean}
   */
  isFilterSelected(): boolean {
    return (this.areas.length > 0 || this.types.length > 0);
  }

  /**
   * Creates an object the implements the exported interface
   * for deselected filters.
   * @param areas the currently selected areas
   * @param types the currently selected types
   */
  createNormalizedFilter(areas, types) {
    console.log(types)
    areas.forEach(area => {
      if (area.id !== 0) {
        this.normalizedFilter.push({type: 'area', name: area.title, id: area.id})
      }
    });
    types.forEach(type => {
      if (type.id !== 0) {
        this.normalizedFilter.push({type: 'type', name: type.name, id: type.id})
      }
    });
  }

  /**
   * Updates the filter store for areas.
   * @param {number} id
   */
  private dispatchAreaUpdate(id: number): void {
    const index = this.areas.findIndex(a => a.id === id);
    this.areas.splice(index, 1);
    console.log('dispatching are with  ')
    console.log(this.areas)
    if (this.areas.length === 0) {
      this.store.dispatch(new SetAreaFilter([{id: 0, title: '', count: 0}]));
    } else {
      this.store.dispatch(new SetAreaFilter(this.areas));
    }
  }

  /**
   * Updates the filter store for types.
   * @param {number} id
   */
  private dispatchTypeUpdate(id: number): void {
    const index = this.types.findIndex(t => t.id === id);
    this.types.splice(index, 1);
    console.log('TYPES: ' + this.types + ' ' + this.types.length)
    if (this.types.length === 0) {
      this.store.dispatch(new SetTypeFilter([{id: 0, name: ''}]));
    } else {
      console.log(this.types)
      this.store.dispatch(new SetTypeFilter(this.types));
    }
  }

  /**
   * Deselects the filter
   * @param type the type of filter to be removed
   * @param id the id of the filter to be removed
   */
  deselect(type, id): void {
    const deselected: DeselectedFilter = {type: type, id: id};
    if (type === 'area') {
     // this.dispatchAreaUpdate(id);
    } else {
     // this.dispatchTypeUpdate(id);
    }
    this.removeFilter.emit(deselected);
  }

  ngOnInit() {
    this.filters$ = this.store.select(fromRoot.getFilters);
    this.filters$.subscribe(filter => {
      this.areas = filter.selectedAreas;
      this.types = filter.selectedTypes;
      console.log(this.areas);
      this.normalizedFilter = [];
      this.createNormalizedFilter(this.areas, this.types);
    });
  }

}
