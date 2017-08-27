import { Component } from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-run-svg',
  templateUrl: './run-svg.component.html',
  styleUrls: ['./run-svg.component.css']
})
export class RunSvgComponent {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'run',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_directions_run_black_24px.svg'));
  }
}
