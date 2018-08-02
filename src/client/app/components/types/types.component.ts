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

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectionList} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {TypesFilter} from '../../shared/data-types/types-filter';
import {animate, style, transition, trigger} from '@angular/animations';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';

export interface SelectedTypeEvent {
  selected: FieldFilterType[];
}

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('200ms ease-in', style({opacity: '1'})),
      ])
    ])]
})
export class TypesComponent implements OnInit {

  @Input() filter: TypesFilter;
  @Output() typeNavigation: EventEmitter <any> = new EventEmitter<any>();
  position = 'before';

  constructor(private filterService: FilterUpdateServiceB,
              private scrollReadyService: ScrollReadyService ) {
  }

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedTypeList(typeId: number): number {
    return this.filter.selectedTypes.findIndex((current) => current.id === typeId);
  }

  hasTypes(): boolean {
    return this.filter.types.length > 0;
  }

  onTypeListControlChanged(typeId: number) {
    const updatedSelectedTypes = this.filterService
      .updateSelectedFields(this.filter.selectedTypes, this.filter.types, typeId, FieldTypeKey.TYPE);
    const updatedTypeEvent: SelectedTypeEvent = {selected: updatedSelectedTypes};
    // Reset the scroll position.
    this.scrollReadyService.setPosition(0);
    this.typeNavigation.emit(updatedTypeEvent);
  }

  isSelected(id: number): boolean {
    if (this.filter.selectedTypes) {
      return this.getPositionInSelectedTypeList(id) > -1;
    }
    return false;
  }

  ngOnInit(): void {
  }

}
