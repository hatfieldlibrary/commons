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

/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {} from 'jasmine';
import {ListHeaderComponent} from "./image-header/image-header.component";
import {appRoutes} from '../app.module';
import {MainContainer} from "../containers/main-container/main.container";
import {ListComponent} from "./collection-list/list.component";
import {NavigationComponent} from "./nav-selector/area.component";
import {SubjectsComponent} from "./subject-selector/subjects.component";
import {AreaInformationComponent} from "./area-information/area-information.component";
import {PageNotFoundComponent} from "../shared/components/page-not-found/page-not-found.component";
import {MaterialModule} from "@angular/material";
import {ItemContainerComponent} from "../containers/item-container/item-container.component";
import {ItemComponent} from "./item/item.component";
import {RelatedItemsComponent} from "./related-items/related-items.component";

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
