import {Component, Input} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {CollectionType} from "../../shared/data-types/collection.type";
import * as Reselect from "reselect";
import Selector = Reselect.Selector;

@Component({
  selector: 'collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],

})
export class ListComponent {

  @Input() collectionList: CollectionType[];


}
