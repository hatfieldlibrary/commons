import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-collections-svg',
  templateUrl: './collections-svg.component.html',
  styleUrls: ['./collections-svg.component.css']
})
export class CollectionsSvgComponent {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'collections',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_collections_white_24px.svg'));
  }


}
