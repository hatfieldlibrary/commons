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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";

@Component({
  selector: 'list-header',
  templateUrl: 'list-header.component.html',
  styleUrls: ['list-header.component.css']
})
export class ListHeaderComponent implements OnInit {

  @Input() areaList: AreaType[];
  @Input() homeScreen: boolean;
  @ViewChild('sidenav') public sideNavigate;
  backgroundImage: string = '/assets/img/campus-visit-header.jpg';
  smallBackgroundImage: string = '/assets/img/campus-visit-header.jpg';

  constructor() { }

  openMenu() {
    this.sideNavigate.open();
  }

  onSelected(selected: boolean) {
    selected ? this.sideNavigate.close() : this.sideNavigate.open();
  }

  ngOnInit() {
  }

}
