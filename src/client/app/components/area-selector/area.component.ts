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
  AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import {AreaListItemType} from '../../shared/data-types/area-list.type';
import {MatSelectionList} from '@angular/material';
import {ClearCollectionsFilter} from '../../actions/collection.actions';

@Component({
  selector: 'app-navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {


  @Input() areaList: AreaListItemType[];
  @Input() selectedAreas: string;
  private lastSelectedIds: number[];
  private selectedOptions: number[];

  constructor(private router: Router,
              private store: Store<fromRoot.State>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'selectedAreas') {
        const areas = changes['selectedAreas'].currentValue;
        this.setLastAreaIds(areas);
      }
    }
  }

  isSelected(id: number): boolean {
    if (this.lastSelectedIds ) {
      return this.lastSelectedIds.indexOf(id) >= 0;
    }
    return false;
  }

  private setLastAreaIds(areas: string): void {
    const areaArr = areas.split(',');
    if (areaArr.length === 0) {
      areaArr.push('0');
    }
    this.lastSelectedIds = [];
    for (const area of areaArr) {
      this.lastSelectedIds.push(parseInt(area, 10));
    }
  }


  _createIdQueryParam(areaList: number[]): string {
    console.log(areaList)
    if (areaList.length === 0) {
      return '0';
    }
    let areaId = '';
    areaList.forEach((id) => {
      const strId = id.toString();
      if (strId !== '0') {
        areaId += strId + ','
      }
    });
    console.log(areaList)
    console.log(areaId)
    areaId = areaId.replace(/,\s*$/, '');
    return areaId;
  }

  _navigateRoute(areaId: string) {
    // the area id can be a string object of length zero.
    if (areaId !== '0' && areaId.length > 0) {
      this.router.navigate(['/', environment.appRoot, 'collection', 'area', areaId]);
    } else {
      this.router.navigate(['/', environment.appRoot, 'collection']);
    }
  }

  private getIndex(list: number[], areaId: number): number {
    return list.indexOf(areaId)
  }

  private removeFromList(list: any, areaId: number): any[] {

    const index = list.indexOf(areaId);
    if (index >= 0) {
      const test = list.splice(index, 1);
      console.log(test)
      return test;
    }
    return list;
  }

  onAreaListControlChanged(list: MatSelectionList, areaId: number) {

    this.store.dispatch(new ClearCollectionsFilter());

    if (areaId === 0 && this.lastSelectedIds.indexOf(0) >= 0) {
      console.log('toggled all collections')
      this._navigateRoute('0');
    } else {
      let updatedAreaId: string;
      this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
      this.store.dispatch(new listActions.CollectionReset());
      const indexOfPrevious = this.getIndex(this.lastSelectedIds, areaId);

      let updatedList: number[];
      // // If the All Collection option is selected, reset the FormArray and navigate.
      if (areaId === 0) {
        updatedAreaId = '0';
        console.log('zero')

      } else if (indexOfPrevious >= 0) {
        console.log('prev')
        updatedList = this.removeFromList(this.selectedOptions, areaId);

        const zeroIndex = this.getIndex(this.selectedOptions, 0);
        if (zeroIndex >= 0) {
          console.log('removing zero ' + zeroIndex)
          updatedList = this.removeFromList(updatedList, areaId);
        }
        updatedAreaId = this._createIdQueryParam(updatedList);
      } else {
        console.log('new')
        const index = this.getIndex(this.selectedOptions, 0);
        if (index >= 0) {
          updatedList = this.removeFromList(this.selectedOptions, areaId);
        } else {
          updatedList = this.selectedOptions;
        }
        // Otherwise, update the FormArray and navigate.
        // this._updateAreaFormArray(this.selectedOptions,  event.checked);
        updatedAreaId = this._createIdQueryParam(updatedList);
        // this._navigateRoute(updatedAreaId);
      }
      this._navigateRoute(updatedAreaId);
      list.selectedOptions.clear();
    }

  }

  ngOnInit() {
    this.selectedOptions = [];
    this.lastSelectedIds = [];
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit() {
    this.setLastAreaIds(this.selectedAreas);

  }

}
