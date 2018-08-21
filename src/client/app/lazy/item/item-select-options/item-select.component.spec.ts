/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */


import {of as observableOf, Observable} from 'rxjs';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ItemSelectComponent} from './item-select.component';
import {DatePickerSvgComponent} from '../../../shared/svg/date-picker-svg/date-picker-svg.component';
import {MatIconModule, MatSelectModule} from '@angular/material';
import {SearchService} from '../../../core/services/search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {HttpClientTestingModule} from '@angular/common/http/testing';


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
              return observableOf([{
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
