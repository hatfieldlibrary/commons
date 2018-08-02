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


