/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {AreaType} from "../shared/data-types/area.type";
import { environment } from '../environments/environment';
import {AreaListItemType} from "../shared/data-types/area-list.type";


export interface AreasResponse {
  area: string;
  response: AreaListItemType[]
}

@Injectable()
export class AreaService {

  constructor(private http: Http) {}

  getAreaList(): Observable<AreaListItemType[]> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/area/collection')
      .map(res => <AreaListItemType[]> res.json());
  }

  getAreaInfo(id:string): Observable<AreaType> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/area/id/' + id)
      .map(res => <AreaType> res.json());
  }

}
