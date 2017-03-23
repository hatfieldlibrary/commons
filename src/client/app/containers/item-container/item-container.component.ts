import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers"
import {Observable} from "rxjs";
import {ItemType} from "../../shared/data-types/item.type";
import * as fromItem from "../../actions/item.actions";

@Component({
  selector: 'item-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css']
})
export class ItemContainerComponent implements OnInit {

  item$: Observable<ItemType>;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.item$ = this.store.select(fromRoot.getItem);

    this.route.params
      .subscribe((params) => {

        if (params['id']) {
          this.store.dispatch(new fromItem.ItemRequest(params['id']));
        }

      });
  }

}
