import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchTerms} from "../../shared/data-types/simple-search.type";
import {Observable} from "rxjs/Observable";
import {SearchOption} from "../../shared/data-types/search-option";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css']
})
export class ItemLinksComponent implements OnChanges {



  @Input() restricted: boolean;
  @Input() linkOptions: string;
  @Input() assetType: string;
  @Input() searchOptions: string;
  @Input() url: string;
  COLLECTION_BUTTON_LABEL: string = 'View Collection';
  ITEM_BUTTON_LABEL: string = 'View Item';
  authentication = true;
  optionList = [];
  currentUrl: string = '';

  constructor(private svc: SearchService, private route: ActivatedRoute) {
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

  getAuthorization() {

    window.open('/auth?url=' + this.currentUrl);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['linkOptions']) {
      if (changes['linkOptions'].currentValue === 'opts') {
        this.svc.getOptionsList(changes['url'].currentValue).subscribe((list) => {
          this.optionList = list;
        })
      }
    }
  }

}
