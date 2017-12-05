import {Component, OnDestroy} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-close',
  templateUrl: './close-svg.component.html',
  viewProviders: [MatIconRegistry]
})
export class CloseSvgComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_clear_black_24px.svg'));
  }
}
