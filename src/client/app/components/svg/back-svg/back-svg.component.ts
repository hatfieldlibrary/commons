import {Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-back',
  templateUrl: './back-svg.component.html',
  viewProviders: [MatIconRegistry]
})
export class BackSvgComponent {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'back',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_white_24px.svg'));
  }
}
