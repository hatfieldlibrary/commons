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

import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {environment} from '../../environments/environment';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import {AreaListItemType} from "../../shared/data-types/area-list.type";

@Component({
  selector: 'app-navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy, AfterViewInit {


  @Input() areaList: AreaListItemType[];
  @Input() selectedAreas: string;
  private selectedAreaArray: string[];
  checkboxGroup: FormGroup;
  formArrayRef: FormArray;
  areaFormArray: FormArray;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
  }

  isSelected(id): boolean {

    if (this.selectedAreas) {
      return this.selectedAreas.indexOf(id) >= 0;
    }
    return false;
  }

  _createIdQueryParam(areaList: FormArray): string {
    if (areaList.getRawValue().length = 0) {
      return '0';
    }
    let areaId = '';
    areaList.getRawValue().forEach((id) => {
      if (id !== '0') {
        areaId += id + ','
      }
    });
    areaId = areaId.replace(/,\s*$/, '');
    return areaId;
  }

  _navigateRoute(areaId: string) {
    // the area id can be a string object of length zero.
    if (areaId !== '0' && areaId.length > 0) {
      this.router.navigate(['/',environment.appRoot,'collection','area', areaId]);
    } else {
      this.router.navigate(['/',environment.appRoot,'collection']);
    }
  }

  _removeFromArray(index: number) {
    if (index >= 0) {
      this.areaFormArray.removeAt(index);
    }
  }

  _updateAreaFormArray(area: string, checked: boolean) {

    if (checked) {
      // Remove the All Collections option from list if other collection area is selected.
      let index = this.areaFormArray.controls.findIndex(x => x.value == '0');
      this._removeFromArray(index);
      // Add the selected collection area to FormArray.
      this.areaFormArray.push(new FormControl(area));
    } else {
      // Remove the collection area from FormArray.
      let index = this.areaFormArray.controls.findIndex(x => x.value == area);
      this._removeFromArray(index);
    }

  }

  onChange(area: string, event: any) {

    this.store.dispatch(new listActions.CollectionReset());

    // If the All Collection option is selected, reset the FormArray and navigate.
    if (area === '0') {
      this.areaFormArray.reset(['0']);
      this._navigateRoute(area);
    }
    else {
      // Otherwise, update the FormArray and navigate.
      this._updateAreaFormArray(area,  event.checked);
      let areaId = this._createIdQueryParam(this.areaFormArray);
      this._navigateRoute(areaId);
    }

  }

  ngOnInit() {
    this.checkboxGroup = this.formBuilder.group({
      areas: this.formBuilder.array([])
    });
    this.formArrayRef = <FormArray>this.checkboxGroup.controls.areas;
    if (this.selectedAreas) {
      this.selectedAreaArray = this.selectedAreas.split(',');
      this.selectedAreaArray.forEach((id) => {
        this.formArrayRef.push(new FormControl(id));
      })
    }
  }

  ngOnDestroy(): void {
    // this.formBuilder = null;
    // this.store  = null;
    this.areaFormArray = null;
    this.checkboxGroup = null;
    this.formArrayRef = null;

  }

  ngAfterViewInit() {
    this.areaFormArray = <FormArray>this.checkboxGroup.controls.areas;

  }

}
