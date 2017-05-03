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

import { ItemComponent } from './item.component';
import {MdButtonModule, MdInputModule, MdListModule, MdSelectModule} from "@angular/material";
import {LockSvgComponent} from "../svg/lock-svg/lock-svg.component";
import {SearchSvgComponent} from "../svg/search-svg/search-svg.component";
import {FormsModule} from "@angular/forms";
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {ItemLinksComponent} from "../item-links/item-links.component";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchService} from "../../services/search.service";
import {AuthCheckService} from "../../services/auth-check.service";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemComponent,
        ItemLinksComponent,
        LockSvgComponent,
        SearchSvgComponent,
        MenuSvgComponent
      ],
      imports: [
        MdListModule,
        MdButtonModule,
        MdInputModule,
        MdSelectModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [

        SearchService,
        AuthCheckService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Observable<any>(),
            url: {
              map: () =>  Observable.of('')
            }
          }
        },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of({});
            };
          }
        },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
