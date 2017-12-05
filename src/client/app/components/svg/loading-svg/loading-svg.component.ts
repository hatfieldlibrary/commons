
import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-loading-svg',
  templateUrl: './loading-svg.component.html',
  styleUrls: ['./loading-svg.component.css'],
  viewProviders: [MatIconRegistry]
})
export class LoadingSvgComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'loading',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/loading-image.svg'));
  }
}
