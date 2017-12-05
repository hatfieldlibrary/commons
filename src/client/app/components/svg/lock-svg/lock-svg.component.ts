import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-lock-svg',
  templateUrl: './lock-svg.component.html',
  viewProviders: [MatIconRegistry]
})
export class LockSvgComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lock',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_https_black_24px.svg'));
  }
}
