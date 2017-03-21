import {Injectable} from "@angular/core";
/**
 * Created by mspalti on 3/17/17.
 */

@Injectable()
export class AreasObserver {

  public static areasObserver (areas, callback) {
    areas.subscribe(callback);
  }

}
