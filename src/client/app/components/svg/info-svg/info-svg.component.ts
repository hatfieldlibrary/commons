import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-info-svg',
  templateUrl: './info-svg.component.html',
  styleUrls: ['./info-svg.component.css']
})
export class InfoSvgComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'info',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_info_outline_black_24px.svg'));
  }
}
