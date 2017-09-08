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
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output,
  SimpleChanges
} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {SelectedSubject} from "app/shared/data-types/selected-subject";

@Component({
  selector: 'app-area-information',
  templateUrl: './area-information.component.html',
  styleUrls: ['./area-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaInformationComponent implements OnChanges, OnDestroy{



  @Input() selectedSubject: SelectedSubject;
  @Input() areaInfo: AreaType[];
  description: string;
  url: string;
  linkLabel: string;
  title: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.areaInfo) {
      if (changes.areaInfo.currentValue.length > 1) {
        let areaList = changes.areaInfo.currentValue;
        let areaTitles = '';
        areaList.forEach((area) => areaTitles += area.title + ', ');
        areaTitles = areaTitles.slice(0, -2);
        this.description = 'Viewing collection areas: <span class="area-color">' + areaTitles + '</span>';
        this.url = '';
        this.linkLabel = '';
        this.title = '';
      } else {
        this.title = changes.areaInfo.currentValue[0].title;
        this.description = changes.areaInfo.currentValue[0].description;
        this.url = changes.areaInfo.currentValue[0].url;
        this.linkLabel = changes.areaInfo.currentValue[0].linkLabel;
      }
    }
  }

  ngOnDestroy(): void {
  }

}
