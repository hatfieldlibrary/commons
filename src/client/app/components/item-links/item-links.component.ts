import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchTerms} from "../../shared/data-types/simple-search.type";
import {Observable} from "rxjs/Observable";

import {ActivatedRoute} from "@angular/router";
import {AuthCheckService} from "../../services/auth-check.service";

@Component({
  selector: 'item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css']
})
export class ItemLinksComponent implements OnChanges, OnInit {



  @Input() restricted: boolean;
  @Input() linkOptions: string;
  @Input() assetType: string;
  @Input() searchOptions: string;
  @Input() url: string;
  COLLECTION_BUTTON_LABEL: string = 'View Collection';
  ITEM_BUTTON_LABEL: string = 'View Item';
  optionList = [];
  currentUrl: string = '';
  isAuthenticated = false;

  constructor(private svc: SearchService, private route: ActivatedRoute, private auth: AuthCheckService) {
    const url: Observable<string> = this.route.url.map(segments => segments.join('/'));
    url.subscribe((url) => this.currentUrl = '/' + url);

  }

  model:SearchTerms = new SearchTerms();

  simpleSearch() {
    this.svc.executeSimpleSearchQuery(this.url, this.model.terms)
  }

  optionSearch(term) {
    this.svc.executeOptionsQuery(this.url, term);

  }

  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['linkOptions']) {
      if (changes['linkOptions'].currentValue === 'opts') {
        this.svc.getOptionsList(changes['url'].currentValue).subscribe((list) => {
          this.optionList = list;
        })
      }

      const auth$ = this.auth.getAuthStatus();
      auth$.subscribe((status) => {
        this.isAuthenticated = status;
      });


    }
  }

}
