
import { Component } from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-loading-svg',
  templateUrl: './loading-svg.component.html',
  styleUrls: ['./loading-svg.component.css'],
  viewProviders: [MdIconRegistry]
})
export class LoadingSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'loading',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/loading-image.svg'));
  }
}
