import {Component} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-keyboard-arrow-back-svg',
  templateUrl: './keyboard-arrow-back-svg.component.html',
  styleUrls: ['./keyboard-arrow-back-svg.component.css']
})
export class KeyboardArrowBackSvgComponent  {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'keyboard-back',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_keyboard_arrow_left_black_48px.svg'));
  }
}
