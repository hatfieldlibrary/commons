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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderComponent } from './image-header.component';
import {MdButtonModule, MdIconRegistry, MdListModule, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {Router, RouterModule} from "@angular/router";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {NavigationComponent} from "../nav-selector/area.component";
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AppMenusComponent} from "../apps-menu/app-menus.component";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {HomeSvgComponent} from "../svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../svg/collections-svg/collections-svg.component";
import {DomSanitizer} from "@angular/platform-browser";

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListHeaderComponent,
        NavigationComponent,
        MenuSvgComponent,
        CloseSvgComponent,
        AppMenusComponent,
        BackSvgComponent,
        MenuSvgComponent,
        HomeSvgComponent,
        CollectionsSvgComponent
      ],
      imports: [
        MdToolbarModule,
        MdSidenavModule,
        MdListModule,
        MdButtonModule,
        RouterTestingModule
      ],
      providers: [
        MdIconRegistry,
        DomSanitizer
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
