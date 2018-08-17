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

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubjectFilter} from '../../../core/data-types/subject-filter';
import {FieldTypeKey, FilterUpdateServiceB} from '../../../core/services/filters-2/filter-update.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';
import {ScrollReadyService} from '../../../core/services/observable/scroll-ready.service';

export interface SelectedSubjectEvent {
  selected: FieldFilterType[];
}

@Component({
  selector: 'app-subject-options',
  templateUrl: './subject-options.component.html',
  styleUrls: ['./subject-options.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('200ms ease-in', style({opacity: '1'})),
      ])
    ])]
})
export class SubjectOptionsComponent {

  @Input() filter: SubjectFilter;
  @Output() subjectNavigation: EventEmitter <any> = new EventEmitter<any>();
  position = 'before';

  /**
   * Injecting ChangeDetectorRef to instruct angular to re-render
   * the view after changes made in the ngAfterViewInit hook method.
   * @param changeDetector
   */
  constructor(private filterService: FilterUpdateServiceB,
              private scrollReadyService: ScrollReadyService) {}

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedSubjectList(id: number): number {
    return this.filter.selectedSubjects.findIndex((current) => current.id === id);
  }

  onSubjectListControlChanged(id: number) {
    const selectedSubjects = this.filterService
      .updateSelectedFields(this.filter.selectedSubjects, this.filter.subjects, id, FieldTypeKey.SUBJECT);
    const updatedSubjectEvent: SelectedSubjectEvent = {selected: selectedSubjects};
    // Reset the scroll position.
    this.scrollReadyService.setPosition(0);
    this.subjectNavigation.emit(updatedSubjectEvent);
  }

  hasSubjects(): boolean {
    return this.filter.subjects.length > 0;
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedSubjects) {
      return this.getPositionInSelectedSubjectList(id) > -1;
    }
    return false;
  }

}
