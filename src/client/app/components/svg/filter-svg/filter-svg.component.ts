
import {Component} from "@angular/core";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'filter-svg',
  templateUrl: './filter-svg.component.html',
  styleUrls: ['./filter-svg.component.css']
})
export class FilterSvgComponent {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'filter-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_filter_list_black_24px.svg'));
  }

}
