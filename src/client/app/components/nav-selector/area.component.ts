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

import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css']
})
export class NavigationComponent implements  OnInit{

  @Input() areaList: AreaType[];
  @Input() selectedAreas: string;
  @Output() onSelected = new EventEmitter<boolean>();
  selectedAreaArray: string[];
  checkboxGroup: FormGroup;
  formArrayRef: FormArray;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  areaSelected(area: AreaType) {

   // [routerLink]="['/commons-preview/collection/area/', area.id]"
    //this.onSelected.emit(true);
    //this.router.navigateByUrl('/commons-preview/collection/area/')
  }


  isSelected(id):boolean {

    if (this.selectedAreas) {
      // if (!id) {
      //   return this.selectedAreas.indexOf('0') >= 0;
      // }
      return this.selectedAreas.indexOf(id) >= 0;
    }
    return false;
  }

  ngOnInit(){

    this.checkboxGroup = this.formBuilder.group({
      areas: this.formBuilder.array([])
    });
    console.log(this.selectedAreas)
    this.formArrayRef = <FormArray>this.checkboxGroup.controls.areas;
    if (this.selectedAreas) {
      this.selectedAreaArray = this.selectedAreas.split(',');
      this.selectedAreaArray.forEach((id) => {
        console.log(id)
        this.formArrayRef.push(new FormControl(id));
      })
    }

    // this.selectedAreas.forEach((selectedArea) => {
    //   this.areaList.forEach((area) => {
    //     if (area.id === +selectedArea) {
    //       this.currentAreas.push({active: true, area: area});
    //     } else {
    //       this.currentAreas.push({active: false, area: area});
    //     }
    //   })
    // });

  }

  _createIdParam(areaList: FormArray): string {
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

  onChange(area:string, event: any) {
    const areaFormArray = <FormArray>this.checkboxGroup.controls.areas;
    if (area === '0') {
      areaFormArray.reset(['0']);
      this.router.navigate(['/commons-preview/collection']);
    }
    else if(event.checked) {
      let index = areaFormArray.controls.findIndex(x => x.value == '0');
      if (index >= 0) {
        areaFormArray.removeAt(index);
      }
       areaFormArray.push(new FormControl(area));
      // console.log(areaFormArray)
       let areaId = this._createIdParam(areaFormArray);
       console.log(areaId)
      if (areaId !== '0') {
        this.router.navigate(['/commons-preview/collection/area/', areaId]);
      } else {
        this.router.navigate(['/commons-preview/collection']);
      }
    } else {
       let index = areaFormArray.controls.findIndex(x => x.value == area)
       areaFormArray.removeAt(index);
      // console.log(areaFormArray)
      let areaId = this._createIdParam(areaFormArray);
      console.log(areaId)
      if (areaId !== '0') {
        this.router.navigate(['/commons-preview/collection/area/', areaId]);
      } else {
        this.router.navigate(['/commons-preview/collection']);
      }
    }
  }

}
