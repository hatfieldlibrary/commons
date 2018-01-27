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
  ChangeDetectionStrategy, Component, Input
} from '@angular/core';
import {MatSelectionList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {NavigationService} from '../../services/navigation/navigation.service';
import {UtilitiesService} from 'app/services/utils/utilities.service';
import {FilterUpdateService} from '../../services/filters/filter-update.service';

@Component({
  selector: 'app-navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() areaList: AreaFilterType[];
  @Input() selectedAreas: AreaFilterType[];
  @Input() selectedTypes: TypesFilterType[];
  @Input() selectedSubject: SubjectFilterType;

  constructor(private utils: UtilitiesService,
              private filterService: FilterUpdateService,
              private navigation: NavigationService) {
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.selectedAreas) {
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
    list.selectedOptions.clear();
    const typeIds = this.filterService.getIds(this.selectedTypes);
    const subjectId = this.selectedSubject.id.toString();
    const updatedSelectedAreas = this.filterService.updateSelectedAreaStore(this.selectedAreas, this.areaList, areaId);
    console.log(updatedSelectedAreas)
    const updatedAreaId = this.filterService.getIds(updatedSelectedAreas);
    this.navigation.navigateRoute(updatedAreaId, typeIds, subjectId);

  }

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    return this.selectedAreas.findIndex((current) => current.id === areaId);
  }


}
