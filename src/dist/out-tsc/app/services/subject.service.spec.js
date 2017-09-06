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
import { inject, TestBed } from "@angular/core/testing";
import { HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { SubjectService } from "./subject.service";
describe('Subject Service', function () {
    var subjectsMock = [
        {
            id: 1,
            name: 'test subject',
            url: ''
        }
    ];
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                SubjectService,
                MockBackend,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    });
    it('get subjects', inject([SubjectService, MockBackend], function (subjectService, mockBackend) {
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: subjectsMock })));
        });
        var result = subjectService.getSubjects('1');
        result.subscribe(function (res) {
            expect(res).toEqual(subjectsMock);
        });
    }));
    it('get all subjects', inject([SubjectService, MockBackend], function (subjectService, mockBackend) {
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: subjectsMock })));
        });
        var result = subjectService.getAllSubjects();
        result.subscribe(function (res) {
            expect(res).toEqual(subjectsMock);
        });
    }));
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/subject.service.spec.js.map