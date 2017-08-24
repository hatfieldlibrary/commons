import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchTerms} from "../../shared/data-types/simple-search.type";
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';
import {ActivatedRoute} from "@angular/router";
import {AuthCheckService} from "../../services/auth-check.service";
import {AuthType} from "../../shared/data-types/auth.type";
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLinksComponent implements OnChanges, OnInit {


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
  COLLECTION_BUTTON_LABEL: string = 'Browse the Collection';
  ITEM_BUTTON_LABEL: string = 'View this Item';
  SEARCH_OPTIONS_LABEL: string = 'Select to Browse';
  isAuthenticated: boolean = false;
  watchers: Subscription;

  constructor(private svc: SearchService,
              private route: ActivatedRoute,
              private auth: AuthCheckService,
              private changeDetector: ChangeDetectorRef,
              private store: Store<fromRoot.State>) {

    this.watchers = new Subscription();
    const url: Observable<string> = this.route.url.map(segments => segments.join('/'));
    let urlWatcher = url.subscribe((url) => {
      this.authenticationPath = environment.authPath + '/' + url
    });
    this.watchers.add(urlWatcher);
  }

  simpleSearch() {
    this.svc.executeSimpleSearchQuery(this.searchUrl, this.model.terms)
  }

  ngOnInit(): void {

    this.model = new SearchTerms();
    this.auth$ = this.store.select(fromRoot.getAuthStatus);

    let authWatcher = this.auth$.subscribe((auth) => {
      this.isAuthenticated = auth.status;
      this.changeDetector.markForCheck();
    });

    this.watchers.add(authWatcher);

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['linkOptions']) {
      // if (changes['linkOptions'].currentValue === 'opts') {
      //   this.svc.getOptionsList(changes['url'].currentValue).subscribe((list) => {
      //     this.optionList = list.result;
      //   })
      // }

      if (this.restricted) {
        this.auth.getAuthStatus();
      }

    }
  }

  ngOnDestroy(): void {
    this.watchers.unsubscribe();
    this.changeDetector.detach();
  }

}
