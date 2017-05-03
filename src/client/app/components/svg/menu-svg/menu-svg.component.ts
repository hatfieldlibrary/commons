import { Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'icon-menu',
  templateUrl: './menu-svg.component.html',
  viewProviders: [MdIconRegistry]
})
export class MenuSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_menu_white_24px.svg'));
  }
}
