import {Component, Input, OnInit} from '@angular/core';
import {RelatedType} from "../../shared/data-types/related-collection";

@Component({
  selector: 'related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {

  @Input() related: RelatedType[];

  constructor() { }

  ngOnInit() {
  }

}
