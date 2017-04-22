import {Component, Input, OnInit} from '@angular/core';
import {SelectedSubject} from "../../shared/data-types/selected-subject";

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  @Input() selectedSubject: SelectedSubject;

  constructor() { }

  ngOnInit() {
    this.selectedSubject = null;
  }

}
