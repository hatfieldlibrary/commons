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
  ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import {AreaListItemType} from '../../shared/data-types/area-list.type';
import {MatSelectionList} from '@angular/material';
import {ClearCollectionsFilter} from '../../actions/collection.actions';
import {SetAreaFilter, SetDefaultAreaFilter} from '../../actions/filter.actions';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';

@Component({
  selector: 'app-navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {


  @Input() areaList: AreaListItemType[];
  @Input() selectedAreas: AreaFilterType[];

  constructor(private router: Router,
              private store: Store<fromRoot.State>) {
  }

  isSelected(id: number): boolean {
    if (this.selectedAreas) {
      return this.getPositionInSelectedList(id) > -1;
    }
    return false;
  }

  private navigateRoute(areaId: string) {
    // the global areaId can be a string with length zero, or 0.
    if (areaId !== '0' && areaId.length > 0) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'area', areaId]);
    } else {
      this.router.navigate(['/', environment.appRoot, 'collection']);
    }
  }

  private getSelectedAreaInfo(areaId: number) {
    return this.areaList.find((current) => current.id === areaId);
  }

  private getPositionInSelectedList(areaId: number) {
    return this.selectedAreas.findIndex((current) => current.id === areaId);
  }

  private getAreaIds(list: AreaFilterType[]) {
    let ids = '';
    if (typeof list !== 'undefined' && typeof list[0] !== 'undefined') {
      list.forEach(area => {
        ids = ids + area.id + ','
      });
    }
    return ids.slice(0, -1);
  }

  private removeAllCollectionsArea() {
    // If zero (all collections) is in list, remove.
    const zeroIndex = this.getPositionInSelectedList(0);
    if (zeroIndex === 0) {
      this.selectedAreas.shift()
    }
  }

  private updateSelectedAreas(selectedArea: AreaFilterType, areaId: number) {
    const currentIndex = this.getPositionInSelectedList(areaId);
    if (currentIndex >= 0) {
      // If the currently selected index is in the list, remove.
      this.selectedAreas.splice(currentIndex, 1);
      // If the selected list is empty, set to default (all collections).
      if (this.selectedAreas.length === 0) {
        this.selectedAreas.push({id: 0, title: '', count: 0});
      }
    } else {
      // Otherwise, just add the new area.
      this.selectedAreas.push(selectedArea);
    }
  }

  /**
   * This function updates the selected areas store and
   * returns new area ids for routing.
   * @param {number} areaId
   * @returns {string} area ids for new route.
   */
  private setSelectedAreas(areaId: number): string {
    // Get area filter information for the selected areaId.
    const selectedArea: AreaFilterType = this.getSelectedAreaInfo(areaId);
    if (selectedArea) {
      // If the all collections area is currently selected, is must be removed now.
      this.removeAllCollectionsArea();
      // Update selectedAreas.
      this.updateSelectedAreas(selectedArea, areaId);
      // Update the store.
      this.store.dispatch(new SetAreaFilter(this.selectedAreas));
    }
    // Get area ids for routing.
    const areaIds = this.getAreaIds(this.selectedAreas);
    return areaIds;
  }

  onAreaListControlChanged(list: MatSelectionList, areaId: number) {
    this.store.dispatch(new ClearCollectionsFilter());

    list.selectedOptions.clear();

    if (areaId === 0) {
      // For zero (all collections) set default and navigate.
      this.store.dispatch(new SetDefaultAreaFilter());
      this.navigateRoute('0');
    } else {
      // For other areas, update the selected areas and navigate.
      this.store.dispatch(new listActions.CollectionReset());
      const updatedAreaId = this.setSelectedAreas(areaId);
      this.navigateRoute(updatedAreaId);
    }

  }
}
