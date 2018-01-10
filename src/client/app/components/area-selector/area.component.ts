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
    // the areas id can be a string object of length zero.
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

  private setSelectedAreas(areaId: number, lastSelectedIds: number[], currentSelectedIds: number[]): string {

    let updatedAreaId: string;
    let updatedList: number[];

    const indexOfPrevious = this.getIndex(lastSelectedIds, areaId);

    if (areaId === 0) {
      updatedAreaId = '0';
    } else if (indexOfPrevious >= 0) {
      updatedList = this.removeFromList(currentSelectedIds, areaId);
      const zeroIndex = this.getIndex(currentSelectedIds, 0);
      if (zeroIndex >= 0) {
        updatedList = this.removeFromList(updatedList, areaId);
      }
      updatedAreaId = this._createIdQueryParam(updatedList);
    } else {
      const index = this.getIndex(currentSelectedIds, 0);
      if (index >= 0) {
        updatedList = this.removeFromList(currentSelectedIds, areaId);
      } else {
        updatedList = currentSelectedIds;
      }
      updatedAreaId = this._createIdQueryParam(updatedList);
    }
    return updatedAreaId;
  }

  onAreaListControlChanged(list: MatSelectionList, areaId: number) {

    this.store.dispatch(new ClearCollectionsFilter());

    if (areaId === 0 && this.lastSelectedIds.indexOf(0) >= 0) {
      console.log('toggled all collections')
      this._navigateRoute('0');
    } else {
      this.store.dispatch(new listActions.CollectionReset());
      const selectedOptions = list.selectedOptions.selected.map(item => item.value);
      const updatedAreaId = this.setSelectedAreas(areaId, this.lastSelectedIds, selectedOptions);
      list.selectedOptions.clear();
      this._navigateRoute(updatedAreaId);
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
