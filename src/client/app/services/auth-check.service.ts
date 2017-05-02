import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthCheckService {

  constructor(private http: Http) {}

  getAuthStatus(): Observable<boolean> {
    return this.http.get('/authCheck')
      .map(res =>  res.json().auth );
  }

}
