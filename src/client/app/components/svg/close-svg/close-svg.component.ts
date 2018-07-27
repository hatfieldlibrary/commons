import {Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-close',
  templateUrl: './close-svg.component.html',
  viewProviders: [MatIconRegistry]
})
export class CloseSvgComponent {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_clear_black_24px.svg'));
  }
}
