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

  getSubjects(areaId: string): Observable<SubjectType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/subject/area/' + areaId)
      .map(res => res.json());
  }

  getAllSubjects(): Observable<SubjectType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/subject')
      .map(res => res.json());
  }

}
