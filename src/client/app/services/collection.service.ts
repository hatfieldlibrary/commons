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
 * Created by mspalti on 2/21/17.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {CollectionType} from "../shared/data-types/collection.type";
import { environment } from '../environments/environment';

@Injectable()
export class CollectionService {

  constructor(private http: Http) {}

  getCollectionsByAreaId(id:string): Observable<CollectionType[]> {

    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/area/' + id)
      .map(res => res.json());
  }

  getCollectionsByAreaSubject(id: string, areaId:string): Observable<CollectionType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/subject/' + id + '/area/' + areaId)
      .map(res => res.json());
  }

  getCollectionsBySubject(id: string): Observable<CollectionType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/subject/' + id)
      .map(res => res.json());
  }

  getAllCollections() : Observable<CollectionType[]> {

    return this.http.get(environment.apiHost + environment.apiRoot + '/collection')
      .map(res => res.json());
  }

}

