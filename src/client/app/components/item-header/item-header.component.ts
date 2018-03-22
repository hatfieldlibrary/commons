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
  Component, Input, OnDestroy, OnInit
} from '@angular/core';

import {ItemType} from "../../shared/data-types/item.type";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-item-header',
  templateUrl: 'item-header.component.html',
  styleUrls: ['item-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderComponent implements OnInit, OnDestroy {


  @Input() item: ItemType;
  watcher: Subscription;
  isMobile = false;

  constructor(private media: ObservableMedia) {
  }

  ngOnInit(): void {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }


}
