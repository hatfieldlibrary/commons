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

import { TestBed, inject } from '@angular/core/testing';
import { SetTimeoutService } from './timeout.service';

describe('SetTimeoutService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetTimeoutService]
    });
  });

  it('should be created', inject([SetTimeoutService], (service: SetTimeoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should call window setTimeout', inject([SetTimeoutService], (service: SetTimeoutService) => {
    spyOn(window, 'setTimeout');
    const callbackFunc = () => {};
    service.setTimeout(0, callbackFunc);
   expect(window.setTimeout).toHaveBeenCalledWith( callbackFunc, 0)
  }));

});