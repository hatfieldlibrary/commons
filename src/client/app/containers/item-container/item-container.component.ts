import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers"
import {Observable} from "rxjs";
import {ItemType} from "../../shared/data-types/item.type";
import * as fromItem from "../../actions/item.actions";
import {RelatedType} from "../../shared/data-types/related-collection";

@Component({
  selector: 'item-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css']
})
export class ItemContainerComponent implements OnInit {

  item$: Observable<ItemType>;
  related$: Observable<RelatedType[]>;
  id: string;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }

  /**
   * Dispatches request for related collections. This requires packaging identifiers
   * from the subjects array for this item into a string.
   * @param data the item object
   */
  getRelatedItems(data: ItemType) {

    if (typeof data.subjects !== 'undefined' &&
      typeof this.id !== 'undefined') {

      let subjectString = '';
      for (let subject of data.subjects) {
        subjectString += subject + ',';

      }
      subjectString = subjectString.slice(0, -1);
      if (subjectString.length > 0) {
        this.store.dispatch(new fromItem.ItemActionRelated(this.id, subjectString));
      }
    }
  }

  ngOnInit() {

    this.store.dispatch(new fromItem.ClearRelatedItems());

    this.item$ = this.store.select(fromRoot.getItem);
    this.related$ = this.store.select(fromRoot.getRelated);

    // Once we have item information, request the related items.
    this.item$.subscribe((data) => {
      this.getRelatedItems(data);

    });

    this.route.params
      .subscribe((params) => {

        if (params['id']) {
          this.id = params['id'];
          this.store.dispatch(new fromItem.ItemRequest(params['id']));

        }

      });
  }

}
