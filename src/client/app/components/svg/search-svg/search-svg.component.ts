import { Component} from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'search-svg',
  templateUrl: './search-svg.component.html',
  styleUrls: ['./search-svg.component.css']
})
export class SearchSvgComponent {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_search_white_24px.svg'));
  }

}

