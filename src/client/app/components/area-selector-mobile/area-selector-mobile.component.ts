/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from '@angular/core';
import {MatSelectionList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {AreasFilter} from '../../shared/data-types/areas-filter';

export interface SelectedAreaEvent {
  selected: AreaFilterType[];
}

@Component({
  selector: 'app-area-selector-mobile',
  templateUrl: 'area-selector-mobile.component.html',
  styleUrls: ['area-selector-mobile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaSelectorMobileComponent {

  @Input() filter: AreasFilter;
  @Output() areaNavigation: EventEmitter <any> = new EventEmitter<any>();
  position = 'before';

  constructor(private filterService: FilterUpdateService) {
  }

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
   * Handles area selection event.
   * @param {MatSelectionList} list
   * @param {number} areaId
   */
  onAreaListControlChanged(list: MatSelectionList, areaId: number) {
    const updatedSelectedAreas = this.filterService.updateSelectedAreaStore(this.filter.selectedAreas, this.filter.areas, areaId);
    const selectedEmitted: SelectedAreaEvent = {selected: updatedSelectedAreas};
    this.areaNavigation.emit(selectedEmitted);
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


}
