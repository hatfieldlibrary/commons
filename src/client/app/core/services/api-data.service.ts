import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';
import {StateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

/**
 * Handles the transfer TransferState object, setting the value
 * on the server side and reading it in the browser.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  /**
   * Constructor
   * @param http the `HttpClient` used to make requests
   * @param state the current transfer state
   * @param platform the platform identifier
   */
  constructor(private http: HttpClient,
              private state: TransferState,
              @Inject(PLATFORM_ID) private platform: Object) { }

  /**
   * Queries the TransferState
   * object and returns observable of the data. Also removes data from the TransferState
   * store so it will be used only on the initial load. This function is called only
   * in the browser platform.
   * @param key the key for the transfer state request
   */
  public getTransferState(key: StateKey<any>): Observable<any> {
    const data = this.state.get(key, null as any);
    this.state.remove(key);
    return observableOf(data);
  }

  /**
   * Returns the http observable, with the side effect
   * of setting the TransferState object when running on the server
   * platform.
   * @param key the key for the transfer state request
   * @param url the url for the data request
   */
  public getApiRequest(key: StateKey<any>, url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        tap((res) => {
          if (isPlatformServer(this.platform)) {
            this.state.set(key, res as any);
          }
        })
      );
  }
}
