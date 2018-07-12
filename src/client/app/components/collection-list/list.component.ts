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

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {CollectionType} from '../../shared/data-types/collection.type';
import {SelectedSubjectEvent} from '../subject-selector/subjects.component';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';

@Component({
  selector: 'app-collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', style({opacity: 0}), {optional: true}),
       // query(':leave', style({opacity: 0}), {optional: true}),
        query(':enter', [
          style({opacity: 0}),
          stagger(300, [
            animate('0.5s', style({opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class ListComponent implements OnDestroy, OnInit {

  @Input() collectionList: CollectionType[];
  @Input() selectedSubject: FieldFilterType;
  @Output() subjectNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  filterTerm: string;
  isMobile = false;
  watcher: Subscription;
  emptySubject: FieldFilterType = {id: 0, name: ''};

  constructor(private filterService: FilterUpdateServiceB,
              private media: ObservableMedia) {
    this.filterTerm = '';
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  /**
   * Emits event to parent component when the subject is deselected. The
   * $event object is not used.
   */
  deselect() {
    this.filterService.removeSelectedAreaFilter();
    const emptySubject: SelectedSubjectEvent = {selected: this.emptySubject};
    this.subjectNavigation.emit(emptySubject);
  }

  setAccessStatus(restricted: boolean): string {
    if (restricted) {
      return 'Restricted to Willamette University';
    }
    return 'Open Access';
  }

  totalResults(): string {
    return this.collectionList.length.toString();
  }

  navigateToItem(id: string) {
    this.collectionNavigation.emit(id);
  }

  setAssetType(type) {
    if (type === 'dig') {
      return 'Collection';
    } else {
      return 'Single Item';
    }
  }

  getListLength() {
    if (this.collectionList) {
      return this.collectionList.length;
    } else {
      return 0;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
    this.subjectNavigation.unsubscribe();
  }

}
