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

import {getTestBed, TestBed} from '@angular/core/testing';
import {SubjectService} from './subject.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';

describe('Subject Service', () => {

  let httpMock;
  let subjectService;

  const mockSubjectList = [
    {
      id: 1,
      name: 'test subject'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SubjectService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    subjectService = getTestBed().get(SubjectService);
  });

  it('should get subject by area', () => {
    const result = subjectService.getSubjectsForArea('1');
    result.subscribe(res => {
      expect(res).toEqual(mockSubjectList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/subject/area/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubjectList);
    httpMock.verify();
  });

  it('should get subject by type', () => {
    const result = subjectService.getSubjectsForType('1');
    result.subscribe(res => {
      expect(res).toEqual(mockSubjectList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/subject/type/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubjectList);
    httpMock.verify();
  });

  it('should get subject by area and type', () => {
    const result = subjectService.getSubjectsForAreaAndType('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockSubjectList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/type/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubjectList);
    httpMock.verify();
  });

  it('should get subject by area, group and type', () => {
    const result = subjectService.getSubjectsForAreaGroupAndType('1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockSubjectList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/category/' + '1' + '/type/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubjectList);
    httpMock.verify();
  });

  it('should get subject by area, group and type', () => {
    const result = subjectService.getSubjectsForAreaAndGroup('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockSubjectList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/category/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubjectList);
    httpMock.verify();
  });

});


