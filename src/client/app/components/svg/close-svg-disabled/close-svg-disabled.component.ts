import {Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-close-disabled',
  templateUrl: './close-svg-disabled.component.html',
  viewProviders: [MatIconRegistry]
})
export class CloseSvgDisabledComponent {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close-disabled',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_clear_gray_24px.svg'));
  }
}
