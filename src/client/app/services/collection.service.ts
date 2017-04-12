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

    // If id is zero, we want to return all collections. Until that is implemented, just set id to 1.
    if (id == '0') {
      id = '1';
    }

    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/area/' + id)
      .map(res => res.json());
  }

  getCollectionsByAreaSubject(id: string, areaId:string): Observable<CollectionType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/subject/' + id + '/area/' + areaId)
      .map(res => res.json());
  }

  getAllCollections() : Observable<CollectionType[]> {

    return this.http.get(environment.apiHost + environment.apiRoot + '/collection')
      .map(res => res.json());
  }

}

