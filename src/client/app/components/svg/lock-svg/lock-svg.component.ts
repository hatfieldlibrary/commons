import { Component } from '@angular/core';
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'lock-svg',
  templateUrl: './lock-svg.component.html',
  viewProviders: [MdIconRegistry]
})
export class LockSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lock',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_https_black_24px.svg'));
  }
}
