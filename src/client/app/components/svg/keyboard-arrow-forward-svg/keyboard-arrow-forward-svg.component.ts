import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-keyboard-arrow-forward-svg',
  templateUrl: './keyboard-arrow-forward-svg.component.html',
  styleUrls: ['./keyboard-arrow-forward-svg.component.css']
})
export class KeyboardArrowForwardSvgComponent  {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'keyboard-forward',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_right_black_48px.svg'));
  }
}
