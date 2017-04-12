/**
 * Created by mspalti on 4/10/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {SubjectType} from "../shared/data-types/subject.type";
import { environment } from '../environments/environment';
import {RelatedType} from "../shared/data-types/related-collection";

@Injectable()
export class RelatedService {

  constructor(private http: Http) {}

  getRelatedCollections(id: string, subjectIds: string): Observable<RelatedType[]> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/collection/' + id + '/related/' + subjectIds)
      .map(res => res.json().related);
  }

}
