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
  ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit,
  ViewChild
} from '@angular/core';
import {SearchService} from '../../services/search.service';
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
