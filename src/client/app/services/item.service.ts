/**
 * Created by mspalti on 3/23/17.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ItemType} from "../shared/data-types/item.type";
import { environment } from '../environments/environment';

@Injectable()
export class ItemService {

  constructor(private http: Http) {}


    getItem(itemId: string): Observable<ItemType> {
      return this.http.get(environment.apiHost + environment.apiRoot + '/collection/info/byId/' + itemId)
        .map(res => res.json());
    }

  // If implemented in final design, add related items service.

}
