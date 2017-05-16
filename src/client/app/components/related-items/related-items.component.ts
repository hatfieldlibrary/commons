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

import {Component, Input,  OnDestroy, OnInit} from '@angular/core';
import {RelatedType} from "../../shared/data-types/related-collection";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit, OnDestroy {


  @Input() related: RelatedType[];
  watcher: Subscription;
  activeMediaQuery = "";
  columns: number = 1;

  constructor(media: ObservableMedia) {

    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      if ( change.mqAlias === 'xs') {
        this.columns = 1;
      } else if (change.mqAlias === 'sm') {
        this.columns = 2;
      } else if (change.mqAlias === 'lg') {
        this.columns = 3;
      }  else {
        this.columns = 4;
      }
    });

  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
