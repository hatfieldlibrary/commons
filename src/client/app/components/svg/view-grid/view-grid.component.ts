import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-view-grid',
  templateUrl: './view-grid.component.html',
  styleUrls: ['./view-grid.component.css']
})
export class ViewGridComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'grid',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/baseline-view_module-24px.svg'));
  }


}
