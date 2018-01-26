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
import {MatSelectionList} from '@angular/material';
import {ClearCollectionsFilter} from '../../actions/collection.actions';
import {SetAreaFilter, SetDefaultAreaFilter} from '../../actions/filter.actions';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';

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

  constructor(private router: Router,
              private store: Store<fromRoot.State>) {
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

  private isAreaSelected(areaId: string): boolean {
    // the global areaId can be a string with length zero, or 0.
    return (areaId !== '0') && (areaId.length > 0);
  }

  private isSubjectSelected(): boolean {
    return (typeof this.selectedSubject !== 'undefined') && (this.selectedSubject.id !== 0);
  }

  private isTypeSelected(): boolean {
    return (typeof this.selectedTypes !== 'undefined') && (this.selectedTypes[0].id !== 0);
  }

  // This needs to become a utility function:
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
   * Uses router to navigate to a route based on the provided areaId.
   * @param {string} areaId area id (can be comma-separated list).
   */
  private navigateRoute(areaId: string): void {

    if (this.isSubjectSelected() && this.isTypeSelected() && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'type', this.getIds(this.selectedTypes),
        'subject', this.selectedSubject.id
      ]);
    } else if (this.isSubjectSelected() && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'subject', this.selectedSubject.id
      ]);
    } else if (this.isTypeSelected() && this.isAreaSelected(areaId)) {
      this.router.navigate(['/',
        environment.appRoot,
        'collection',
        'area', areaId,
        'type', this.getIds(this.selectedTypes)
      ]);
    } else if (this.isTypeSelected()) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'type', this.getIds(this.selectedTypes)]);
    } else if (this.isAreaSelected(areaId)) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'area', areaId]);
    } else {
      this.router.navigate(['/', environment.appRoot, 'collection']);
    }

  }

  /**
   * Gets the area list item with the provided id from the list of all areas.
   * @param {number} areaId the id of the area to retrieve
   * @returns {AreaFilterType}
   */
  private getSelectedAreaInfo(areaId: number): AreaFilterType {
    return this.areaList.find((current) => current.id === areaId);
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

  /**
   * Generates the comma-separated list of ids.
   * @param {AreaFilterType[]} list list of areas
   * @returns {string}
   */
  private getAreaIds(list: AreaFilterType[]): string {
    let ids = '';
    if (typeof list !== 'undefined' && typeof list[0] !== 'undefined') {
      list.forEach(area => {
        ids = ids + area.id + ','
      });
    }
    return ids.slice(0, -1);
  }

  /**
   * Removes the all collections area (id: 0) from selectedAreas
   * (if it is present).
   */
  private removeAllCollectionsArea(): void {
    // If zero (all collections) is in list, remove.
    const zeroIndex = this.getPositionInSelectedList(0);
    if (zeroIndex === 0) {
      this.selectedAreas.shift()
    }
  }

  /**
   * Update selected areas.
   * @param {AreaFilterType} selectedArea
   * @param {number} areaId
   */
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
   * Get the comma-separated area id's used for routing.
   * @returns {string}
   */
  private getAreaParameter(): string {
    const areaIds = this.getAreaIds(this.selectedAreas);
    return areaIds;
  }

  /**
   * This function updates the selected areas store and
   * returns new area ids for routing.
   * @param {number} areaId
   * @returns {string} area ids for new route.
   */
  private setSelectedAreas(areaId: number): void {
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
  }

  /**
   * Handles area selection event.
   * @param {MatSelectionList} list
   * @param {number} areaId
   */
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
      this.setSelectedAreas(areaId);
      const updatedAreaId = this.getAreaParameter();
      this.navigateRoute(updatedAreaId);
    }

  }
}
