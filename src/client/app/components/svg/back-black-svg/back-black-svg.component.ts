import {Component, OnDestroy} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';


@Component({
  selector: 'app-back-black-svg',
  templateUrl: './back-black-svg.component.html',
  styleUrls: ['./back-black-svg.component.css'],
  viewProviders: [MdIconRegistry]
})
export class BackBlackSvgComponent implements OnDestroy{

  ngOnDestroy(): void {
    this.iconRegistry = null;
    this.sanitizer = null;
  }

  constructor(private iconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'back-black',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
  }
}
