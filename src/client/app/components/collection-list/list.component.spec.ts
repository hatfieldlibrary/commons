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
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule, MdCardModule, MdListModule} from "@angular/material";
import {ListComponent} from './list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {appRoutes} from '../../app.module';
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import {MainContainer} from "../../containers/main-container/main.container";
import {AppComponent} from "../app.component";
import {NavigationComponent} from "../nav-selector/area.component";
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {ListHeaderComponent} from "../image-header/image-header.component";
import {AreaInformationComponent} from "../area-information/area-information.component";
import {ItemContainerComponent} from "../../containers/item-container/item-container.component";
import {ItemComponent} from "../item/item.component";
import {RelatedItemsComponent} from "../related-items/related-items.component";
import {EventEmitter} from "@angular/core";


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      imports: [
        MdCardModule,
        MdListModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
