import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AuthType} from '../shared/data-types/auth.type';

/**
 * This service solves the problem of how to track the current authentication status
 * in components. You can track the status in the component and call this service only
 * when the status as needed.
 */
@Injectable()
export class AuthCheckService {

  constructor(private http: HttpClient, public store: Store<fromRoot.State>) {}

  /**
   * Gets the current authentication status via server request.
   */
  getAuthStatus():  Observable<boolean> {
        return this.http.get<AuthType>(environment.authCheck)
          .map(res => res.auth);
      }
}
