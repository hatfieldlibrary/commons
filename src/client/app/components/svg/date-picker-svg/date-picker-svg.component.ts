import { Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-date-picker-svg',
  templateUrl: './date-picker-svg.component.html',
  styleUrls: ['./date-picker-svg.component.css']
})
export class DatePickerSvgComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'date-picker',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_date_range_black_24px.svg'));
    }

}
