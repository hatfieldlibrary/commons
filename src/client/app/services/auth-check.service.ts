import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers";
import {environment} from '../environments/environment';
import {Observable} from "rxjs/Observable";

/**
 * This service solves the problem of how to track the current authentication status
 * in components. You can track the status in the component and call this service only
 * when the status as needed.
 */
@Injectable()
export class AuthCheckService {

  constructor(private http: Http,public store: Store<fromRoot.State>) {}

  /**
   * Gets the current authentication status via server request.
   */
  getAuthStatus():  Observable<boolean> {
        return this.http.get(environment.authCheck)
          .map(res => res.json().auth);
      }
}
