import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  @Input() areaList: AreaType[];

  constructor() {}

  ngOnInit(): void {
  }

}
