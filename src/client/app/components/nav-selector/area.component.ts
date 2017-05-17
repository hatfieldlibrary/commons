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

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";


@Component({
  selector: 'navigation-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css']
})
export class NavigationComponent {

  @Input() areaList: AreaType[];

  @Output() onSelected = new EventEmitter<boolean>();

  areaSelected() {
    this.onSelected.emit(true);
  }

}
