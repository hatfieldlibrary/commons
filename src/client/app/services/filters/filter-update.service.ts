

import {Injectable} from '@angular/core';

@Injectable()
export class FilterUpdateService {

  constructor() {}

  /**
   * Adds a new object to the filter array.
   * @param {Object[]} current
   * @param selected
   * @returns {Object[]}
   */
  addFilter(current: object[], selected): object[] {
    current.push(selected);
    return current;
  }

  /**
   * Removes object with matching id from the filter array.
   * Note that this function can return an empty array.
   * @param {Object[]} current
   * @param {number} id
   * @returns {Object[]}
   */
  removeFilter(current: object[], id: number): object[] {
    const position = current.findIndex(function(obj) { return obj[id] === id; });
    return current.splice(position, 1);
  }

}
