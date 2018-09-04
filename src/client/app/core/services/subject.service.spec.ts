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
import {environment} from '../../environments/environment';
import {ApiDataService} from './api-data.service';
import {TransferState} from '@angular/platform-browser';
import {AreaService} from './area.service';

describe('Subject Service', () => {


  let subjectService;
  let apiService;
  let transferState;
  let transferStateHasKey: boolean;
  const SUBJECT_KEY = 'subject-options';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        SubjectService,
        {
          provide: ApiDataService,
          useValue: {
            getTransferState: jasmine.createSpy('getTransferState'),
            getApiRequest: jasmine.createSpy('getApiRequest')
          }
        },
        {
          provide: TransferState,
          useValue: {
            hasKey: () => transferStateHasKey
          }
        }
      ]
    });
    subjectService = TestBed.get(SubjectService);
    apiService = getTestBed().get(ApiDataService);
    transferState = getTestBed().get(TransferState);
    subjectService = getTestBed().get(SubjectService);
    spyOn(transferState, 'hasKey').and.callThrough();
  });

  it('should get subjects for area from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForArea('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for area from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForArea('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot + '/subject/area/' + '1');
  });

  it('should get subjects for type from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForType('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for type from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForType('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot + '/subject/type/' + '1');
  });

  it('should get subjects for area and type from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForAreaAndType('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for area and type from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForAreaAndType('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/type/' + '1');
  });

  it('should get subjects for area group and type from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForAreaGroupAndType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for area group and type from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForAreaGroupAndType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/category/' + '1' + '/type/' + '1');
  });

  it('should get subjects for area group from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForAreaGroupAndType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for area group and type from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForAreaGroupAndType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/category/' + '1' + '/type/' + '1');
  });

  it('should get subjects for area group and type from store', () => {
    transferStateHasKey = true;
    subjectService.getSubjectsForAreaAndGroup('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(SUBJECT_KEY);
  });

  it('should get subjects for area group from api', () => {
    transferStateHasKey = false;
    subjectService.getSubjectsForAreaAndGroup('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(SUBJECT_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(SUBJECT_KEY,
      environment.apiHost + environment.apiRoot
      + '/subject/area/' + '1' + '/category/' + '1');
  });


});


