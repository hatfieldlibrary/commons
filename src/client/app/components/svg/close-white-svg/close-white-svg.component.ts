import { Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-close-white',
  templateUrl: './close-white-svg.component.html',
  viewProviders: [MdIconRegistry]
})
export class CloseWhiteSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close-white',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_close_white_16px.svg'));
  }
}
