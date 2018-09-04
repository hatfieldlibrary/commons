import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {of as observableOf} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';
import {StateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient,
              private state: TransferState,
              @Inject(PLATFORM_ID) private platform: Object) { }

  /**
   * Supports angular universal state transfer. Queries the TransferState
   * object and returns observable of the data. Also removes data from the TransferState
   * store so it will be used only on the initial load. This function is called only
   * in the browser.
   * @param key
   */
  getTransferState(key: StateKey<any>) {
    const data = this.state.get(key, null as any);
    this.state.remove(key);
    return observableOf(data);
  }

  /**
   * Returns the http observable, with the side effect
   * of setting the TransferState object when running on the server
   * platform. The state information will be serialized
   * and returned to the browser.
   * @param key
   * @param url
   */
  getApiRequest(key: StateKey<any>, url: string) {
    return this.http.get<any>(url)
      .pipe(
        tap((res) => { console.log('resp')
          if (isPlatformServer(this.platform)) {
            this.state.set(key, res as any);
          }
        })
      );
  }
}
