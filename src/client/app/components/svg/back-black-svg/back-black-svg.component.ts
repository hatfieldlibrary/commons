import { Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'back-black-svg',
  templateUrl: './back-black-svg.component.html',
  styleUrls: ['./back-black-svg.component.css'],
  viewProviders: [MdIconRegistry]
})
export class BackBlackSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'back-black',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
  }
}
