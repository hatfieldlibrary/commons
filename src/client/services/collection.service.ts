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

  getCollectionsByAreaId(id): Observable<CollectionType[]> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/byArea/' + id)
      .map(res => res.json());
  }

  getCollectionsByAreaSubject(id, areaId): Observable<CollectionType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/bySubject/' + id + '/area/' + areaId)
      .map(res => res.json());
  }

}

