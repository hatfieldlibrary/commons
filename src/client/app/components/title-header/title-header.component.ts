import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent implements OnInit {

  @Input() title;
  @Input() subjectList;
  @Input() areaId;
  @Input() type;

  constructor() { }

  ngOnInit() {
  }

}
