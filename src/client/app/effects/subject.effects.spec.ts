//
// /*
//  * Copyright (c) 2017.
//  *
//  *   This program is free software: you can redistribute it and/or modify
//  *    it under the terms of the GNU General Public License as published by
//  *    the Free Software Foundation, either version 3 of the License, or
//  *    (at your option) any later version.
//  *
//  *    This program is distributed in the hope that it will be useful,
//  *    but WITHOUT ANY WARRANTY; without even the implied warranty of
//  *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  *    GNU General Public License for more details.
//  *
//  *   You should have received a copy of the GNU General Public License
//  *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//  */
//
//
// import {inject, TestBed} from "@angular/core/testing";
// import {Observable} from "rxjs";
// import {HttpModule} from "@angular/http";
// import {SubjectService} from "../services/subject.service";
// import {SubjectEffects} from "./subject.effects";
// import {AllSubjectAction, SubjectAction, SubjectActionTypes} from "../actions/subject-actions";
//
// describe('Subject Effect', () => {
//   let subjectEffects: SubjectEffects;
//   let subjectService: SubjectService;
//
//   const subjectsMock = [
//     {
//       id: 1,
//       name: 'test subject',
//       url: ''
//     }
//   ];
//
//
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [
//
//       HttpModule
//     ],
//     providers: [
//       SubjectEffects, SubjectService
//
//     ]
//   }));
//   it('should call Subject Success action after subjects for area list is loaded.',
//     inject([
//         SubjectEffects, SubjectService
//       ],
//       ( _subjectEffects:SubjectEffects, _subjectService:SubjectService ) => {
//
//         subjectEffects = _subjectEffects;
//         subjectService = _subjectService;
//         spyOn(subjectService, 'getSubjects')
//           .and.returnValue(Observable.of(subjectsMock));
//         runner.queue(new SubjectAction('1'));
//         subjectEffects.subjectEffect$.subscribe(result => {
//           expect(result.type).toEqual(SubjectActionTypes.SUBJECT_LIST_SUCCESS);
//           expect(result.payload[0].name).toEqual('test subject');
//
//         });
//       })
//   );
//
//   it('should call Subject Success action after all subjects are loaded.',
//     inject([
//         EffectsRunner, SubjectEffects, SubjectService
//       ],
//       (_runner:EffectsRunner, _subjectEffects:SubjectEffects, _subjectService:SubjectService ) => {
//         runner = _runner;
//         subjectEffects = _subjectEffects;
//         subjectService = _subjectService;
//         spyOn(subjectService, 'getAllSubjects')
//           .and.returnValue(Observable.of(subjectsMock));
//         runner.queue(new AllSubjectAction());
//         subjectEffects.allSubjectEffect$.subscribe(result => {
//           expect(result.type).toEqual(SubjectActionTypes.ALL_SUBJECT_LIST_SUCCESS);
//           expect(result.payload[0].name).toEqual('test subject');
//
//         });
//       })
//   );
// });
//
