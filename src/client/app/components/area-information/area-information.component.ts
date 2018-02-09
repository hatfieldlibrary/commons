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
  ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {AreaType} from '../../shared/data-types/area.type';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-area-information',
  templateUrl: './area-information.component.html',
  styleUrls: ['./area-information.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaInformationComponent implements OnChanges {

  @Input() areaInfo: AreaType[];
  description: string;
  url: string;
  linkLabel: string;
  title: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.areaInfo.currentValue) {
      if (changes.areaInfo.currentValue.length > 1) {
        const areaList = changes.areaInfo.currentValue;
        let areaTitles = '';
        areaList.forEach((area) => areaTitles += area.title + ', ');
        areaTitles = areaTitles.slice(0, -2);
        this.description = '<div>Search in collection areas: </div><div class="mat-title areas-color">' + areaTitles + '</div>';
        this.url = '';
        this.linkLabel = '';
        this.title = '';
      } else if (changes.areaInfo.currentValue[0]) {
        this.title = changes.areaInfo.currentValue[0].title;
        this.description = changes.areaInfo.currentValue[0].description;
        this.url = changes.areaInfo.currentValue[0].url;
        this.linkLabel = changes.areaInfo.currentValue[0].linkLabel;
      }
    }
  }

}
