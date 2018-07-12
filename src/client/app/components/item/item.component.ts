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
  Component, Input, ChangeDetectionStrategy
} from '@angular/core';
import {ItemType} from '../../shared/data-types/item.type';
import {ObservableMedia} from '@angular/flex-layout';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';

/**
 * This is the parent component for presenting all item data.
 */
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: ItemType;
  @Input() selectedArea: string;
  @Input() selectedSubjects: FieldFilterType[];
  @Input() selectedGroups: FieldFilterType[];
  @Input() selectedTypes: FieldFilterType[];

  constructor(private navigationService: NavigationServiceB,
              public media: ObservableMedia) {
  }

  getBackLink(): string {
    const typeIds = this.navigationService.getIds(this.selectedTypes);
    const subjectIds = this.navigationService.getIds(this.selectedSubjects);
    const groupIds = this.navigationService.getIds(this.selectedGroups);
    const path =
      this.navigationService.getBackLink(this.selectedArea, groupIds, subjectIds, typeIds);
    return path;

  }

  hasItems(): boolean {
    return this.item.collection.items !== null;
  }

  hasDates(): boolean {
    return this.item.collection.date !== null;
  }

  hasSubjects(): boolean {
    return this.item.subjects !== null && this.item.subjects.length > 0;
  }

  hasTypes(): boolean {
    return this.item.itemTypes !== null && this.item.itemTypes.length > 0;
  }

  getItemType(): string {
    let itemType: string;
    if (this.item.collection.assetType === 'itm') {

      itemType = 'item';
    } else {
      itemType = 'collection';
    }
    return itemType;
  }

}
