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
import {SubjectsComponent} from './subjects.component';
import {MdButtonModule, MdIconModule, MdListItem, MdListModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {KeyboardArrowForwardSvgComponent} from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import {KeyboardArrowBackSvgComponent} from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {ElementRef} from "@angular/core";
import {SetIntervalService} from "../../services/interval.service";
import {By} from "@angular/platform-browser";
import {SubjectType} from "../../shared/data-types/subject.type";
import {Subscription} from "rxjs/Subscription";


let mockSubjectList: SubjectType[] = [
  {
    id: 1,
    name: 'sub one',
    url: ''
  },
  {
    id: 2,
    name: 'sub two',
    url: ''
  }
];

class MockIntervalService {
  callback;

  clearInterval = jasmine.createSpy('clearInterval');

  public setInterval(time: number, callback: () => void): any {
    this.callback = callback;
    return null;
  }

  tick() {
    this.callback();
  }
}

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let mockIntervalService = new MockIntervalService();
  let store;
  let intervalService;
  let watcher: Subscription;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubjectsComponent,
        KeyboardArrowBackSvgComponent,
        KeyboardArrowForwardSvgComponent
      ],
      imports: [
        MdButtonModule,
        RouterTestingModule,
        MdIconModule,
        MdListModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch')
          }
        },
        {
          provide: SetIntervalService,
          useValue: mockIntervalService
        },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(SubjectsComponent);
    intervalService = fixture.debugElement.injector.get(SetIntervalService);

    component = fixture.componentInstance;
    component.type = 'area';
    component.areaId = 1;
    component.subjectList = mockSubjectList;
    fixture.detectChanges();
    spyOn(intervalService, 'setInterval');
    spyOn(component, 'showSubjectNavigationArrow');
    watcher = component.watcher;
    spyOn(watcher,'unsubscribe');

    store = fixture.debugElement.injector.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset subject list in store', () => {
    component.resetList();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should animate scroll request', (done) => {
    fixture.whenStable().then(
      () => {
        let debugElement = fixture.debugElement.query(By.directive(MdListItem));
        component.subjects = debugElement;
        component.onScrollRequest('right');
        expect(intervalService.setInterval).toHaveBeenCalled();
        done();
      }
    );
  });

  it('should remove listeners when component is destroyed', () => {
    fixture.destroy();
    expect(watcher.unsubscribe).toHaveBeenCalled();
    expect(intervalService.clearInterval).toHaveBeenCalled();
  });

});
