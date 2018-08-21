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

import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {AreasFilter} from '../../../core/data-types/areas-filter';
import {FilterUpdateServiceB} from '../../../core/services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../../core/services/observable/scroll-ready.service';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';
import {ListKeyManager, ListKeyManagerOption} from '@angular/cdk/a11y';
import {MatListItem, MatListOption} from '@angular/material';

export interface SelectedAreaEvent {
  selected: FieldFilterType[];
}

@Component({
  selector: 'app-area-options',
  templateUrl: './area-options.component.html',
  styleUrls: ['./area-options.component.css']
})
export class AreaOptionsComponent {

  @Input() filter: AreasFilter;
  @Output() areaNavigation: EventEmitter <any> = new EventEmitter<any>();

  constructor(private filterService: FilterUpdateServiceB,
              private scrollReadyService: ScrollReadyService) {}

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedAreas) {
      return this.getPositionInSelectedList(id) > -1;
    }
    return false;
  }

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    return this.filter.selectedAreas.findIndex((current) => current.id === areaId);
  }

  /**
   * Handles area selection event.
   * @param {number} areaId
   */
  onAreaListControlChanged(areaId: number) {
    const updatedArea = this.filterService.updateSelectSingleAreaStore(this.filter.areas, areaId);
    const selectedEmitted: SelectedAreaEvent = {selected: updatedArea};
    // Reset the scroll position.
    this.scrollReadyService.setPosition(0);
    this.areaNavigation.emit(selectedEmitted);
  }
}
