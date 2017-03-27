/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {AreaType} from "../shared/data-types/area.type";
import { environment } from '../environments/environment';


interface AreasResponse {
  area: string;
  response: AreaType[]
}

@Injectable()
export class AreaService {

  constructor(private http: Http) {}

  getAreas(id): Observable<AreasResponse> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/areas')
      .map(res => <AreasResponse>{area: id, response: res.json()});
  }

}
