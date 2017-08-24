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

import {ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'list-header',
  templateUrl: 'list-header.component.html',
  styleUrls: ['list-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListHeaderComponent implements OnInit, OnDestroy {

  @Input() areaList: AreaType[];
  @Input() homeScreen: boolean;
  @ViewChild('sidenav') public sideNavigate;
  state = '';
  mediaWatcher: Subscription;
  backgroundImage: string = '/assets/img/campus-visit-header.jpg';
  smallBackgroundImage: string = '/assets/img/campus-visit-header.jpg';

  constructor(public media:ObservableMedia) {
  }

  ngOnInit() {
    this.mediaWatcher = this.media.asObservable()
      .subscribe((change:MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
      });
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
}
