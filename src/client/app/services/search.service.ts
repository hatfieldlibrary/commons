import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {Http} from "@angular/http";

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  /*
    TODO This service is hard-coded to current cview queries. Needs to be somehow generalized!
   */

  /**
   * Opens option query target in a new window. The base url is provided here because Tagger currently accepts
   * only the collection name as parameter.  This allows us to look up the options list from the remote API
   * service. This is a known issue in Tagger.
   * @param collection the collection name
   * @param terms user provided search terms
   */
  executeOptionsQuery (collection: string, terms: string) {
    const query =  encodeURIComponent(terms);
    const href = `http://libmedia.willamette.edu/cview/${collection}.html#!search:search:${collection}/all^${query}^all^and!`;
    window.open(href, '_blank');
  }

  /**
   * Opens simple search query target in a new window.
   * @param baseURL base url for the query
   * @param terms user provided search terms
   */
  executeSimpleSearchQuery(baseURL: string, terms: string) {
    const query =  encodeURIComponent(terms);

    let splitString = baseURL.split('{$query}');
console.log(splitString)
    const href = splitString[0] + query + splitString[1];
    //const href = baseURL + `all^${query}^all^and!`;
   // const href = baseURL.template();
    console.log(href)
    window.open(href, '_blank');
  }

  getOptionsList(collection: string) {
    return this.http.get(environment.apiHost + environment.apiRoot + '/options/external/' + collection)
      .map(res => res.json());
  }


}
