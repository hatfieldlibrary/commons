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

import {Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {ItemType} from "../../shared/data-types/item.type";
import {SubjectType} from "../../shared/data-types/subject.type";
import {UtilitiesService} from "../../services/utilities.service";
import {SearchService} from "../../services/search.service";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnChanges, OnDestroy {

  @Input() item: ItemType;
  @Input() selectedArea: string;
  @Input() selectedSubject: SubjectType;
  optionList;
  state = '';
  watchers: Subscription;

  constructor(private svc: SearchService,
              private utils: UtilitiesService,
              public media: ObservableMedia) {

  }

  getBackLink(): string {
    let path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
    return path;

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['item']) {
      if (changes['item'].currentValue.collection.linkOptions === 'opts') {
        let optionsWatcher = this.svc.getOptionsList(changes['item'].currentValue.collection.url).subscribe((list) => {
          this.optionList = list.result;
        });
        this.watchers.add(optionsWatcher);
      }


    }
  }

  ngOnInit(): void {
    this.watchers = new Subscription();

    let mediaWatcher = this.media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
      });
    this.watchers.add(mediaWatcher);

  }

  ngOnDestroy(): void {
    this.watchers.unsubscribe();
  }

}
