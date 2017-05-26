import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchTerms} from "../../shared/data-types/simple-search.type";
import {Observable} from "rxjs/Observable";

import {ActivatedRoute} from "@angular/router";
import {AuthCheckService} from "../../services/auth-check.service";
import {AuthType} from "../../shared/data-types/auth.type";
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {MdSelectModule} from "@angular/material";

@Component({
  selector: 'item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css']
})
export class ItemLinksComponent implements OnChanges, OnInit {


  auth$: Observable<AuthType>;

  @Input() restricted: boolean;
  @Input() linkOptions: string;
  @Input() assetType: string;
  @Input() searchOptions: string;
  @Input() url: string;
  @Input() searchUrl: string;
  model:SearchTerms;
  COLLECTION_BUTTON_LABEL: string = 'Browse the Collection';
  ITEM_BUTTON_LABEL: string = 'View this Item';
  SEARCH_OPTIONS_LABEL: string = 'Select to Browse';
  optionList = [];
  currentUrl: string = '';
  isAuthenticated: boolean;


  constructor(private svc: SearchService,
              private route: ActivatedRoute,
              private auth: AuthCheckService,
              private store: Store<fromRoot.State>) {

    const url: Observable<string> = this.route.url.map(segments => segments.join('/'));
    url.subscribe((url) => this.currentUrl = '/' + url);

  }

  simpleSearch() {
    this.svc.executeSimpleSearchQuery(this.searchUrl, this.model.terms)
  }

  optionSearch(term) {
    this.svc.executeOptionsQuery(this.url, term);

  }

  ngOnInit(): void {

    this.model = new SearchTerms();
    this.isAuthenticated = false;
    this.auth$ = this.store.select(fromRoot.getAuthStatus);
    this.auth$.subscribe((auth) => this.isAuthenticated = auth.status )

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['linkOptions']) {
      if (changes['linkOptions'].currentValue === 'opts') {
        this.svc.getOptionsList(changes['url'].currentValue).subscribe((list) => {
          this.optionList = list.result;
        })
      }

      if (this.restricted) {
        this.auth.getAuthStatus();
      }


    }
  }

}
