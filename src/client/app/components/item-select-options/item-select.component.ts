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

import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-item-select-component',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSelectComponent {

  @Input() optionList;
  @Input() url: string;
  @Input() restricted: boolean;
  @Input() isAuthenticated: boolean = false;
  SEARCH_OPTIONS_LABEL: string = 'Browse by Date';
  href: string;

  constructor(private svc: SearchService,
              @Inject(DOCUMENT) private document: any) { }

  // The redirect parameter is used by tests. Defaults to
  // true in normal use.
  optionSearch(term, redirect: boolean = true) {
    this.href = this.svc.getOptionsQuery(this.url, term);
    if (redirect) {
      this.document.location.href = this.href;
    }
  }

}
