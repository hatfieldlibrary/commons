import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {SearchTerms} from '../../shared/data-types/simple-search.type';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {AuthCheckService} from '../../services/auth-check.service';
import {AuthType} from '../../shared/data-types/auth.type';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {SetAuthStatus} from "../../actions/auth.action";

@Component({
  selector: 'app-item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLinksComponent implements OnInit, OnDestroy {


  auth$: Observable<AuthType>;
  authenticationPath: string;
  @Input() restricted: boolean;
  @Input() linkOptions: string;
  @Input() optionList;
  @Input() assetType: string;
  @Input() searchOptions: string;
  @Input() url: string;
  @Input() searchUrl: string;
  model: SearchTerms;
  COLLECTION_BUTTON_LABEL = 'Browse the Collection';
  ITEM_BUTTON_LABEL = 'View this Item';
  SEARCH_OPTIONS_LABEL = 'Select to Browse';
  isAuthenticated = false;
  watchers: Subscription;

  constructor(private svc: SearchService,
              private route: ActivatedRoute,
              private auth: AuthCheckService,
              private changeDetector: ChangeDetectorRef,
              private store: Store<fromRoot.State>,
              @Inject(DOCUMENT) private document) {

    this.watchers = new Subscription();
    const url: Observable<string> = this.route.url.map(segments => segments.join('/'));
    const urlWatcher = url.subscribe((path) => {
      this.authenticationPath = environment.authPath + '/' + path;
    });
    this.watchers.add(urlWatcher);
  }

  simpleSearch() {
    const href = this.svc.executeSimpleSearchQuery(this.searchUrl, this.model.terms);
    this.document.location.href = href;
  }

  ngOnInit(): void {

    this.model = new SearchTerms();
    // Using the store to track authentication.
    this.auth$ = this.store.select(fromRoot.getAuthStatus);
    const authWatcher = this.auth$.subscribe((auth) => {
      this.isAuthenticated = auth.status;
      // Make sure to pick up the change next cycle.
      this.changeDetector.markForCheck();
    });
    this.watchers.add(authWatcher);
    // Retrieve the current authentication status. We update the store,
    // although that is not useful if this component remains the
    // only interested party!
    this.auth.getAuthStatus().subscribe((auth) => {
      this.store.dispatch(new SetAuthStatus({status: auth}));
    });

  }

  ngOnDestroy(): void {

    if (this.watchers) {
      this.watchers.unsubscribe();
    }
    this.route = null;
    this.changeDetector = null;
    this.document = null;
    this.auth = null;
    this.store = null;
    this.svc = null;
  }

}
