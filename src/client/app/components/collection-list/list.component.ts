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

import {Component, Input} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {CollectionType} from "../../shared/data-types/collection.type";
import * as Reselect from "reselect";
import Selector = Reselect.Selector;

@Component({
  selector: 'collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],

})
export class ListComponent {

  @Input() collectionList: CollectionType[];


}
