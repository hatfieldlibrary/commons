import {Component, OnInit, Input} from '@angular/core';
import {ItemType} from "../../shared/data-types/item.type";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: ItemType;

  constructor() { }

  ngOnInit() {
  }

}
