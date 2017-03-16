import {Component, Input} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";

@Component({
  selector: 'area-information',
  templateUrl: './area-information.component.html',
  styleUrls: ['./area-information.component.css']
})
export class AreaInformationComponent  {

  @Input() areaInfo: AreaType;


}
