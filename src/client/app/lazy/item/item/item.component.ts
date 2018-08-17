/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {
  Component, Input, ChangeDetectionStrategy
} from '@angular/core';
import {ItemType} from '../../../core/data-types/item.type';
import {ObservableMedia} from '@angular/flex-layout';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';

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
