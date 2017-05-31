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
  AfterViewInit, Component, ElementRef, HostListener, Input, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {SubjectType} from "../../shared/data-types/subject.type";


@Component({
  selector: 'subject-selector',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css']
})
export class SubjectsComponent implements AfterViewInit {


  @Input() subjectList: SubjectType[];
  @Input() areaId: number;
  @Input() type: string;
  @ViewChild('container') container: ElementRef;
  @ViewChildren('subjects', {read: ElementRef}) contentEls: QueryList<ElementRef>;
  offsetWidth: number;
  selectorWidth: number;
  lastButtonWidth: number;
  defaultLeftOffset: number = 60;
  lastSubjectButton: ElementRef;
  leftScroll: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.offsetWidth = event.target.innerWidth;
    this.showSubjectNavigationArrow();
  }

  onScroll(event) {
    this.leftScroll = event.srcElement.scrollLeft;
    this.showSubjectNavigationArrow();
  }

  ngAfterViewInit(): void {

    this.offsetWidth =  this.container.nativeElement.offsetWidth;
    this.contentEls.changes.subscribe((el) => {
      this.lastSubjectButton = el._results[this.subjectList.length - 1];
      let leftOffset: number = this.lastSubjectButton.nativeElement.lastElementChild.offsetLeft;
      this.lastButtonWidth = this.lastSubjectButton.nativeElement.lastElementChild.offsetWidth;
      this.selectorWidth = leftOffset + this.lastButtonWidth;
      this.showSubjectNavigationArrow();
    })

  }

  /**
   * Sets visibility of horizontal navigation arrows based on the
   * value of previously set member variables.
   */
  showSubjectNavigationArrow(): void {

    if (this.selectorWidth > this.offsetWidth) {
      console.log('show right arrow')
    } else {
      console.log('hide right arrow and left arrow')
    }
    if ((this.leftScroll - this.defaultLeftOffset) > 0) {
      console.log('show left arrow')
    }
    if ((this.leftScroll + this.offsetWidth + this.lastButtonWidth) >= this.selectorWidth + this.defaultLeftOffset) {
      console.log('hide right arrow')
    }

  }


}
