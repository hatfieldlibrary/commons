import { Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-menu-svg',
  templateUrl: './menu-svg.component.html',
  styleUrls: ['./menu-svg.component.css']
})
export class MenuSvgComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_menu_white_24px.svg'));
  }
}
