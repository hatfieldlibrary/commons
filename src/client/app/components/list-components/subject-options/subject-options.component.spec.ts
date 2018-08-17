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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOptionsComponent } from './subject-options.component';
import {MatListModule} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollReadyService} from '../../../services/observable/scroll-ready.service';


describe('SubjectOptionsComponent', () => {
  let component: SubjectOptionsComponent;
  let fixture: ComponentFixture<SubjectOptionsComponent>;
  let readyService;
  let filterService;

  const mockSubjectsFilter = {
    selectedSubjects: [{id: 1, name: 's1'}],
    subjects: [{id: 1, name: 's1'}, {id: 2, name: 's2'}]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOptionsComponent ],
      imports: [MatListModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectedFields = jasmine.createSpy('updateSelectedFields').and.returnValue([{id: 1, name: ''}]);
        }
      },
        {
          provide: ScrollReadyService,
          useClass: class {
            setPosition = jasmine.createSpy('setPosition');
          }
        }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOptionsComponent);
    component = fixture.componentInstance;
    component.filter = mockSubjectsFilter;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.subjectNavigation, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onSubjectListControlChanged(1);
    expect(component.subjectNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectedFields)
      .toHaveBeenCalledWith(mockSubjectsFilter.selectedSubjects, mockSubjectsFilter.subjects,  1, FieldTypeKey.SUBJECT);
  });
});
