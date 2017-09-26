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

/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {SubjectType} from "../shared/data-types/subject.type";
import { environment } from '../environments/environment';

@Injectable()
export class SubjectService {

  constructor(private http: Http) {}

  getSubjects(areaIds: string): Observable<SubjectType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/subject/area/' + areaIds)
      .map(res => res.json());
  }

  getAllSubjects(): Observable<SubjectType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/subject')
      .map(res => res.json());
  }

}
