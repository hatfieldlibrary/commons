import {Injectable} from '@angular/core';
import {LIST} from './mock-list';

@Injectable()
export class ListServiceService {



  constructor() {
  }

  getListCount(test: number): Promise<string> {
    return Promise.resolve(LIST[test]);

  }

}
