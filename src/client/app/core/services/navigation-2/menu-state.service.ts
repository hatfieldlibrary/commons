import { Injectable } from '@angular/core';
import {Params} from '@angular/router';

export interface AppMenuUpdate {
  setParameters(params: Params);
}
@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  constructor() { }


}
