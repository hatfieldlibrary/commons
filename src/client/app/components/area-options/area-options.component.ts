import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {MatNavList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {FilterUpdateService} from '../../services/filters/filter-update.service';

export interface SelectedAreaEvent {
  selected: AreaFilterType[];
}

@Component({
  selector: 'app-area-options',
  templateUrl: './area-options.component.html',
  styleUrls: ['./area-options.component.css']
})
export class AreaOptionsComponent {

  @Input() filter: AreasFilter;
  @Output() areaNavigation: EventEmitter <any> = new EventEmitter<any>();
  @Output() removeFilter: EventEmitter <any> = new EventEmitter<any>();

  constructor(private filterService: FilterUpdateServiceB) {}

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedAreas) {
      return this.getPositionInSelectedList(id) > -1;
    }
    return false;
  }

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    return this.filter.selectedAreas.findIndex((current) => current.id === areaId);
  }

  /**
   * Handles area selection event.
   * @param {MatSelectionList} list
   * @param {number} areaId
   */
  onAreaListControlChanged(list: MatNavList, areaId: number) {
    // Removing the current area filter will also clear all other currently applied filters.
    this.removeFilter.emit({type: 'area', id: areaId });
    // This is used if mulitple areas are permitted.  Removed from the current app version.
    // const updatedSelectedAreas = this.filterService.updateSelectedAreaStore(this.filter.selectedAreas, this.filter.areas, areaId);
    // Used if only single area is permitted.
    const updatedArea = this.filterService.updateSelectSingleAreaStore(this.filter.areas, areaId);
    const selectedEmitted: SelectedAreaEvent = {selected: updatedArea};
    this.areaNavigation.emit(selectedEmitted);
  }
}
