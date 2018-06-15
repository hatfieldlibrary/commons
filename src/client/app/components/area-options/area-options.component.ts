import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {MatNavList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';

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

  constructor(private filterService: FilterUpdateService) {}

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
    const updatedSelectedAreas = this.filterService.updateSelectedAreaStore(this.filter.selectedAreas, this.filter.areas, areaId);
    const selectedEmitted: SelectedAreaEvent = {selected: updatedSelectedAreas};
    this.areaNavigation.emit(selectedEmitted);
  }
}
