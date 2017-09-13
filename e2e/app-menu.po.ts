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

import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

export class CommonsPage {
  navigateTo(location: string) {
    if (location === 'home') {
      return browser.get('/commons/collection');
    }
    if (location === 'area') {
      return browser.get('/commons/collection/area/7');
    }
    if (location === 'item') {
      return browser.get('/commons/item/id/20/7');
    }
  }

  getAppMenu() {
    return element(by.css('app-menus-component'));
  }

  getAppMenuItemLabels() {
    return element.all(by.css('app-menus-component md-list-item h5'));
  }

  getMenuButton() {
    return element(by.css('app-menus-component button#menu-button'));
  }

  getBackButton() {
    return element(by.css('app-menus-component button#back-button'));
  }

  getHomeLinkAnchor() {
    return element(by.css('app-menus-component a#home-link'));
  }
}
