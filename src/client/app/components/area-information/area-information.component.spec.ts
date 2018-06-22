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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AreaInformationComponent} from './area-information.component';
import {MatButtonModule, MatCardModule, MatChipsModule} from '@angular/material';
import {EventEmitter, SimpleChange} from '@angular/core';

describe('AreaInformationComponent', () => {
  let component: AreaInformationComponent;
  let fixture: ComponentFixture<AreaInformationComponent>;

  const mockArea = {
    id: 1,
    title: 'test areas',
    linkLabel: '',
    url: '',
    searchUrl: '',
    image: '',
    description: '',
    position: 1

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaInformationComponent],
      imports: [
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update single areas information on change.', () => {
    component.areaInfo = [mockArea];

    component.ngOnChanges({
      areaInfo: new SimpleChange(null, component.areaInfo, true)
    });
    fixture.detectChanges();

    expect(component.title).toEqual('test areas');

  });

  it('should update multiple areas information on change.', () => {
    component.areaInfo = [mockArea, mockArea];

    component.ngOnChanges({
      areaInfo: new SimpleChange(null, component.areaInfo, true)
    });
    fixture.detectChanges();

    expect(component.title).toEqual('');
    expect(component.description).toContain('Viewing collection areas');

  });

});
