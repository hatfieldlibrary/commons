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

import { CommonsPage } from './app-menu.po';
import {browser} from "protractor";

/**
 * When using protractor flow control, promises are not required. But for this
 * to work with typescript, you need to have the correct jasmine bindings in node_modules.
 * If these bindings are not available or not working, in a pinch you can set the
 * type for the expect function to any (expect<any>).
 *
 * Place all requests that return promises in the expect parameter. Jasmine expect
 * is adapted to understand promises.
 *
 * https://github.com/angular/protractor/blob/master/docs/control-flow.md#promises-and-the-control-flow
 */
describe('Application menu', function() {
  let page: CommonsPage;

  beforeEach(() => {
    page = new CommonsPage();
  });

  it('should show app menu', () => {
    page.navigateTo('home');
    expect(page.getAppMenu()).toBeDefined();
    expect(page.getAppMenuItemLabels().get(0).isDisplayed()).toBe(false);
    page.getMenuButton().click();
    expect(page.getAppMenuItemLabels().get(0).isDisplayed()).toBe(true);

  });

  it('should navigate back to collections for areas page from item page', () => {
    page.navigateTo('area');
    page.navigateTo('item');
    page.getBackButton().click();
    expect(browser.getCurrentUrl()).toContain('/commons/collection/areas/7');

  });

  it('should provide link to the static commons home page', () => {
    page.navigateTo('home');
    expect(page.getHomeLinkAnchor().getAttribute('href')).toEqual('http://libmedia.willamette.edu/academiccommons');
  });

});
