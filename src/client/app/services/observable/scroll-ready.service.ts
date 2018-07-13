import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ScrollReadyService {
  private pos = 0;
  private subject = new Subject();

  constructor() { }

  /**
   * Sets the current scroll position.
   * @param {number} pos
   */
  setPosition(pos = 0) {
    this.pos = pos;
  }

  /**
   * Informs subscribers that the component has it's data
   * and is ready for a scroll event.
   */
  setReady(): void {
    this.subject.next(this.pos);
  }

  /**
   * Subscribers register here.
   * @param callback
   * @returns {Subscription}
   */
  subscribe(callback): Subscription {
    return this.subject.subscribe(callback);
  }
}
