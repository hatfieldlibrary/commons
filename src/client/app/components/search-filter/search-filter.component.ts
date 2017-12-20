import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {SetCollectionsFilter} from '../../actions/collection.actions';

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
    this.store.dispatch(new SetCollectionsFilter(event));
  }

  ngOnInit() {}

}
