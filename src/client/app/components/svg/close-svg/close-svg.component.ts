import {Component, OnDestroy} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'app-icon-close',
  templateUrl: './close-svg.component.html',
  viewProviders: [MdIconRegistry]
})
export class CloseSvgComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }
  constructor(private iconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_clear_black_24px.svg'));
  }
}
