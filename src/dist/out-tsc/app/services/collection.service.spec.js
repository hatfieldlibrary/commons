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
import { CollectionService } from "./collection.service";
describe('Collection Service', function () {
    var mockCollections = [
        {
            id: 1,
            title: 'test title',
            image: 'image',
            url: 'url',
            browseType: '',
            description: '',
            dates: '',
            items: '',
            ctype: '',
            repoType: '',
            restricted: true,
            published: false,
            createdAt: '',
            updatedAt: '',
            AreaId: 1,
            CollectionId: 1
        }
    ];
    var mockCollectionsForSubject = [
        {
            id: 2,
            title: 'test subject title',
            image: 'image',
            url: 'url',
            browseType: '',
            description: '',
            dates: '',
            items: '',
            ctype: '',
            repoType: '',
            restricted: true,
            published: false,
            createdAt: '',
            updatedAt: '',
            AreaId: 1,
            CollectionId: 1
        }
    ];
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                CollectionService,
                MockBackend,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    });
    it('get collections by area', inject([CollectionService, MockBackend], function (collectionService, mockBackend) {
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: mockCollections })));
        });
        var result = collectionService.getCollectionsByAreaId('1');
        result.subscribe(function (res) {
            expect(res).toEqual({
                mockCollections: mockCollections
            });
        });
    }));
    it('get collections by subject', inject([CollectionService, MockBackend], function (collectionService, mockBackend) {
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: mockCollectionsForSubject })));
        });
        var result = collectionService.getCollectionsByAreaSubject('1', '1');
        result.subscribe(function (res) {
            expect(res).toEqual({
                mockCollectionsForSubject: mockCollectionsForSubject
            });
        });
    }));
    it('get all collections', inject([CollectionService, MockBackend], function (collectionService, mockBackend) {
        var testResponse = mockCollectionsForSubject.concat(mockCollections);
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: testResponse })));
        });
        var result = collectionService.getAllCollections();
        result.subscribe(function (res) {
            expect(res).toEqual({
                testResponse: testResponse
            });
        });
    }));
    it('get collections by subject', inject([CollectionService, MockBackend], function (collectionService, mockBackend) {
        mockBackend.connections.subscribe(function (conn) {
            conn.mockRespond(new Response(new ResponseOptions({ body: mockCollectionsForSubject })));
        });
        var result = collectionService.getCollectionsBySubject('1');
        result.subscribe(function (res) {
            expect(res).toEqual({
                mockCollectionsForSubject: mockCollectionsForSubject
            });
        });
    }));
});
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/services/collection.service.spec.js.map