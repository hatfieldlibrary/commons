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
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy,
  OnInit, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {SubjectType} from '../../shared/data-types/subject.type';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import {SetIntervalService} from "../../services/interval.service";
import {MdListItem} from "@angular/material";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-subject-selector',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() subjectList: SubjectType[];
  @Input() areaId: number;
  @Input() type: string;
  @ViewChild('container') container: ElementRef;
  @ViewChild('list', {read: ElementRef}) subjects: ElementRef;
  @ViewChildren(MdListItem, {read: ElementRef}) contentEls: QueryList<ElementRef>;

  selectedSubject: SubjectType;
  watcher: Subscription;
  offsetWidth: number;
  selectorWidth: number;
  lastButtonWidth: number;
  defaultOffset = 100;
  lastSubjectButton: ElementRef;
  leftScroll = 0;
  isMobile = true;
  leftIsVisible = false;
  rightIsVisible = false;
  appRoot = environment.appRoot;

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
              private intervalService: SetIntervalService,
              private store: Store<fromRoot.State>) {

    this.watcher = new Subscription();

    const mediaWatcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.watcher.add(mediaWatcher);

  }

  /**
   * Resets the subject ilst in store.
   */
  resetList(subjectId): void {
    if (subjectId !== this.selectedSubject.id) {
      this.store.dispatch(new listActions.CollectionReset());
    }
  }

  /**
   * Set up selected subject watcher.
   */
  ngOnInit(): void {
    const subjectWatcher = this.store.select(fromRoot.getSelectedSubject).subscribe((id) => {
      this.selectedSubject = id;
    });
    this.watcher.add(subjectWatcher);
  }

  /**
   * Unsubscribe media watcher.
   */
  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
    this.intervalService.clearInterval();
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
   * Returns integer value for 10% of the current container width.
   * @returns {number}
   * @private
   */
  _getOffsetPaddingValue(): number  {
    return Math.floor(0.1 * this.offsetWidth);
  }

  /**
   *
   * @param {string} direction
   * @returns {number}
   * @private
   */
  _setAnimiationLimit(direction: string): number {
    let check: number;
    if (direction === 'right') {
      if (this.subjects.nativeElement.scrollLeft + this.offsetWidth >= this.subjects.nativeElement.offsetWidth) {
        check = this.subjects.nativeElement.offsetWidth - this._getOffsetPaddingValue();
      } else {
        check = this.subjects.nativeElement.scrollLeft + this.offsetWidth;
      }
    }

    if (direction === 'left') {
      if (this.subjects.nativeElement.scrollLeft  - (this.offsetWidth - this._getOffsetPaddingValue()) > 0) {
        check = this.subjects.nativeElement.scrollLeft - (this.offsetWidth - this._getOffsetPaddingValue());
      } else {
        check = 0;
      }
    }
    return check;
  }

  /**
   * Using setInterval to animate horizontal scroll.
   * @param direction the direction to scroll
   */
  onScrollRequest(direction: string): void {

    // Set animation counter.
    let animationCounter;
    if (direction === 'right') {
      animationCounter = 0;
    }
    if (direction === 'left') {
      animationCounter = this.subjects.nativeElement.scrollLeft
    }
    // Set the animation limit.
    let limit = this._setAnimiationLimit(direction);

    let interval = 20;

    // Start the animation.
    this.intervalService.setInterval(5, () => {
      if (direction === 'right') {
        animationCounter = animationCounter + interval;
        this.subjects.nativeElement.scrollLeft = this.subjects.nativeElement.scrollLeft + interval;
      }
      if (direction === 'left') {
        if (this.subjects.nativeElement.scrollLeft >= 0) {
          animationCounter = animationCounter - interval;
          this.subjects.nativeElement.scrollLeft = this.subjects.nativeElement.scrollLeft - interval;
        }
      }
      // Stop the animation.
      if (direction === 'right') {
        if (animationCounter >= limit - 25) {
          this.intervalService.clearInterval();
        }
      }
      if (direction === 'left') {
        if (animationCounter <= limit || animationCounter === 0) {
          this.intervalService.clearInterval();
        }
      }

    });

  }

  /**
   * Hook method.
   * See https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
   */
  ngAfterViewInit(): void {

    this.offsetWidth = this.container.nativeElement.offsetWidth;
    const changeWatcher = this.contentEls.changes.subscribe((el) => {
      this.lastSubjectButton = el._results[this.subjectList.length - 1];
      const leftOffset: number = this.lastSubjectButton.nativeElement.lastElementChild.offsetLeft;
      this.lastButtonWidth = this.lastSubjectButton.nativeElement.lastElementChild.offsetWidth;
      this.selectorWidth = leftOffset + this.lastButtonWidth;
      this.showSubjectNavigationArrow();
      this.changeDetector.detectChanges();
    });

    this.watcher.add(changeWatcher);
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
