import {Component, Input} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";


@Component({
  selector: 'area-selector',
  templateUrl: 'area.component.html',
  styleUrls: ['area.component.css']
})
export class AreaComponent {

  @Input() areaList: AreaType[];

}
