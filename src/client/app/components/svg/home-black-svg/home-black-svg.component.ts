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

import {Component, OnDestroy} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-home-black-svg',
  templateUrl: './home-black-svg.component.html',
  styleUrls: ['./home-black-svg.component.css'],
  viewProviders: [MatIconRegistry]
})
export class HomeBlackSvgComponent implements  OnDestroy{

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'home-black',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_home_black_24px.svg'));
  }
}
