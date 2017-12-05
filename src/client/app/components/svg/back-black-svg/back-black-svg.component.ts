import {Component, OnDestroy} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-back-black-svg',
  templateUrl: './back-black-svg.component.html',
  styleUrls: ['./back-black-svg.component.css'],
  viewProviders: [MatIconRegistry]
})
export class BackBlackSvgComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'back-black',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
  }
}
