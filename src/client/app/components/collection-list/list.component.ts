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
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {SelectedSubjectEvent} from '../subject-selector/subjects.component';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnDestroy {

  @Input() collectionList: CollectionType[];
  @Input() selectedSubject: SubjectFilterType;
  @Output() subjectNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  filterTerm: string;
  isMobile = false;
  watcher: Subscription;
  emptySubject: SubjectFilterType = {id: 0, name: ''};

  constructor(private filterService: FilterUpdateService,
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

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
    this.subjectNavigation.unsubscribe();
  }

}
