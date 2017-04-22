import { Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'icon-close',
  templateUrl: './close-svg.component.html',
  viewProviders: [MdIconRegistry]
})
export class CloseSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_clear_black_24px.svg'));
  }
}
