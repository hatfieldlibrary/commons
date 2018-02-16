
import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-help-svg',
  templateUrl: './help-svg.component.html',
  styleUrls: ['./help-svg.component.css']
})
export class HelpSvgComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'help-icon',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_help_outline_black_24px.svg'));
  }

}
