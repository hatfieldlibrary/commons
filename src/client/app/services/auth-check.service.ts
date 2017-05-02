import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers";
import {AuthType} from "../shared/data-types/auth.type";
import * as authActions from '../actions/auth.action';

/**
 * This service solves the problem of how to track the current authentication status
 * in components.  If the current auth status is false, it check with the server to
 * determine if the session has been authenticated via CAS.  Sessions are set to expire
 * when the browser is closed, so there is not need to check the session status again after
 * we know that it is true.  If we add a logout feature, then we will need to call this
 * service every time the component is initalized.
 */
@Injectable()
export class AuthCheckService {

  auth$: Observable<AuthType>;
  authStatus: boolean;

  constructor(private http: Http, private store: Store<fromRoot.State>) {

    this.auth$ = this.store.select(fromRoot.getAuthStatus);
    /**
     * Subscribe to the authentication status in store and update
     * the local member variable on change.
     */
    this.auth$.subscribe((auth) => this.authStatus = auth.status);

  }

  /**
   * Update authentication status in the store.
   * @param status
   */
  setAuthStatus(status: boolean): void {
    this.store.dispatch(new authActions.SetAuthStatus({status: status}));

  }

  /**
   * Gets the current authentication status via server request if the local client
   * status is false.  Updates the store if the server request returns a true value.
   */
  getAuthStatus(): void {

      if (this.authStatus === false) {

        this.http.get('/authCheck')
          .map(res => res.json().auth)
          .subscribe((status) => {

              if (status === true) {
                this.setAuthStatus(status);
              }

            });

      }

  }

}
