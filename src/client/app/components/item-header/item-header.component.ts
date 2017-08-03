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
  ChangeDetectionStrategy,
  Component, Input, OnInit
} from '@angular/core';

import {ItemType} from "../../shared/data-types/item.type";



@Component({
  selector: 'item-header',
  templateUrl: 'item-header.component.html',
  styleUrls: ['item-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderComponent implements OnInit {

  @Input() item: ItemType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
