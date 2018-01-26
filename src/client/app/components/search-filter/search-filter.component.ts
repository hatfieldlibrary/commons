import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {SetCollectionsFilter} from '../../actions/collection.actions';
import {Observable} from 'rxjs/Observable';
import {SetSearchFilter} from '../../actions/filter.actions';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent implements OnInit {

  @Input() collectionList: CollectionType[];
  filterTerm: string;

  constructor(private store: Store<fromRoot.State>) {
  }

  onChange(event): void {
    console.log(event)
    this.store.dispatch(new SetSearchFilter(event));
  }

  ngOnInit() {
    this.store.select(fromRoot.getCollectionFilterTerm)
      .subscribe((x) => this.filterTerm = x);
  }

}
