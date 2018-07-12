import {Component, OnDestroy, OnInit} from '@angular/core';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {ActivatedRoute} from '@angular/router';
import {CollectionType} from '../../shared/data-types/collection.type';
import {DispatchService} from '../../services/dispatch.service';

@Component({
  selector: 'app-submit-dspace',
  templateUrl: './submit-dspace.component.html',
  styleUrls: ['./submit-dspace.component.css']
})
export class SubmitDspaceComponent implements OnInit, OnDestroy {

  areas$: Observable<AreaFilterType[]>;
  selectedAreas: AreaFilterType[];
  collections$:  Observable<CollectionType[]>;

  areaId = '0';
  position = 'right';

  /**
   * Used to clean up subscriptions OnDestroy.
   */
  watchers: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private navigation: NavigationServiceB,
              private route: ActivatedRoute,
              private dispatchService: DispatchService
              ) { }


  navigateToItem(url: string): void {

    url = url.replace('ds', 'xmlui');
    url += '/submit';
    document.location.href = url;
  }

  ngOnInit() {

    this.areas$ = this.store.select(fromRoot.getAreas);
    this.collections$ = this.store.select(fromRoot.getFilteredCollections);

    this.watchers = new Subscription();

    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.dispatchService.dispatchActions(undefined, params['typeId'], undefined, undefined);
      });
    this.watchers.add(routeWatcher);

  }

  ngOnDestroy() {
    this.watchers.unsubscribe();
  }

}
