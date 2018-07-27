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

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ItemSelectComponent} from './item-select.component';
import {DatePickerSvgComponent} from '../svg/date-picker-svg/date-picker-svg.component';
import {MatIconModule, MatSelectModule} from '@angular/material';
import {SearchService} from '../../services/search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ItemSelectComponent', () => {
  let component: ItemSelectComponent;
  let fixture: ComponentFixture<ItemSelectComponent>;
  let svc;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemSelectComponent,
        DatePickerSvgComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: SearchService,
          useValue: {
            getOptionsQuery: (url, term) => {
              return term;
            },
            getOptionsList: (url) => {
              return Observable.of([{
                  item: {
                    title: 'test'
                  }
                }])
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    svc = fixture.debugElement.injector.get(SearchService);

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get query link', () => {
    spyOn(svc, 'getOptionsQuery').and.callThrough();
    // set redirect param to avoid loading new page during test.
    component.optionSearch('test', false);
    expect(svc.getOptionsQuery).toHaveBeenCalled();
    expect(component.href).toContain('test');
  });

  it('should fetch options list onInit', fakeAsync(() => {
    spyOn(svc, 'getOptionsList').and.callThrough();
    component.ngOnInit();
    tick();
    // fixture.detectChanges();
    expect(svc.getOptionsList).toHaveBeenCalled();
  }));

});
