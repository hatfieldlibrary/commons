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
  ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit,
  ViewChild
} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs/Observable';

/**
 * This component creates an options list from date
 * retrieved via the SearchService.
 */
@Component({
  selector: 'app-item-select-component',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSelectComponent implements OnInit  {

  @Input() url: string;
  @Input() restricted: boolean;
  @Input() isAuthenticated = false;
  @ViewChild('selector', {read: ElementRef}) select: ElementRef;
  SEARCH_OPTIONS_LABEL = 'Browse by Date';
  href: string;
  optionList: Observable<any[]>;

  constructor(private svc: SearchService,
              @Inject(DOCUMENT) private document: any) {
  }

  /**
   * Uses the injected document token to change location.
   * The redirect parameter is used by tests. Defaults to
   * true in normal use.
   */
  optionSearch(term, redirect = true) {
    // This could be a local variable, but using a field makes
    // this method testable.
    this.href = this.svc.getOptionsQuery(this.url, term);
    if (redirect) {
      this.document.location.href = this.href;
    }
  }

  /**
   * Inside the OnInit hook method, call the options list
   * service for asynchronous data. The options list is
   * not tracked in global state (redux store) so it makes
   * sense to do this work in the leaf node and not farther up
   * the component tree.
   */
  ngOnInit() {
    this.optionList = this.svc.getOptionsList(this.url);
  }

}
