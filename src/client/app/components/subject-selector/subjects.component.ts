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
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, Renderer2,
  ViewChild, ViewChildren
} from '@angular/core';
import {SubjectType} from "../../shared/data-types/subject.type";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'subject-selector',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() subjectList: SubjectType[];
  @Input() areaId: number;
  @Input() type: string;
  @ViewChild('container') container: ElementRef;
  @ViewChild('list', {read: ElementRef}) subjects: ElementRef;
  @ViewChildren('subjects', {read: ElementRef}) contentEls: QueryList<ElementRef>;

  watcher: Subscription;
  offsetWidth: number;
  selectorWidth: number;
  lastButtonWidth: number;
  defaultOffset: number = 100;
  lastSubjectButton: ElementRef;
  leftScroll: number = 0;
  isMobile: boolean = true;
  leftIsVisible: boolean = false;
  rightIsVisible: boolean = false;

  /**
   * Listen for window resize and adjust navigation arrows.
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // on window resize, recheck the container element width.
    this.offsetWidth = this.container.nativeElement.offsetWidth;
    this.showSubjectNavigationArrow();
  }

  /**
   * Injecting ChangeDetectorRef to instruct angular to re-render
   * the view after changes made in the ngAfterViewInit hook method.
   * @param changeDetector
   */
  constructor(private changeDetector: ChangeDetectorRef,
              private media: ObservableMedia,
              private renderer: Renderer2 ) {
  }

  /**
   * Set up media watcher.
   */
  ngOnInit(): void {

    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  /**
   * Unsubscribe media watcher.
   */
  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  /**
   * Response to scroll event in component by updating the
   * left scroll position and calling function to update navigation
   * arrow visibility.
   * @param event
   */
  onScroll(event): void {
    this.leftScroll = event.srcElement.scrollLeft;
    this.showSubjectNavigationArrow();
  }


  /**
   * Using setInterval to animate horizontal scroll.
   * @param direction the direction to scroll
   */
  onScrollRequest(direction: string): void {
    let limit = 0;

    let animation = setInterval(() => {
      if (direction === 'right') {
        this.subjects.nativeElement.scrollLeft += limit++

      }
      if (direction === 'left') {
        if (this.subjects.nativeElement.scrollLeft >= 0) {
          this.subjects.nativeElement.scrollLeft -= limit++
        }
      }
      if (limit === 290 || limit === 0) {
        clearInterval(animation);
      }
    }, 5);


  }

  /**
   * Hook method.
   * See https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
   */
  ngAfterViewInit(): void {

    this.offsetWidth = this.container.nativeElement.offsetWidth;
    this.contentEls.changes.subscribe((el) => {
      this.lastSubjectButton = el._results[this.subjectList.length - 1];
      let leftOffset: number = this.lastSubjectButton.nativeElement.lastElementChild.offsetLeft;
      this.lastButtonWidth = this.lastSubjectButton.nativeElement.lastElementChild.offsetWidth;
      this.selectorWidth = leftOffset + this.lastButtonWidth;
      this.showSubjectNavigationArrow();
      this.changeDetector.detectChanges();
    });


  }

  /**
   * Sets visibility of horizontal navigation arrows based on the
   * value of previously set member variables.
   */
  showSubjectNavigationArrow(): void {

    if (this.selectorWidth > this.offsetWidth) {
      this.rightIsVisible = true;
    } else {
      this.leftIsVisible = false;
      this.rightIsVisible = false;
      return;
    }
    if ((this.leftScroll - this.defaultOffset) > 0) {
      this.leftIsVisible = true;
    } else {
      this.leftIsVisible = false;
    }
    if ((this.leftScroll + this.offsetWidth + this.lastButtonWidth) >= this.selectorWidth + this.defaultOffset) {
      this.rightIsVisible = false;
    }

  }


}
