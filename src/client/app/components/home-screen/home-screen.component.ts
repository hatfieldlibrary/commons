import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedSubject} from "../../shared/data-types/selected-subject";

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent  {

  @Input() selectedSubject: SelectedSubject;
  @Output() removeSubject: EventEmitter<void> = new EventEmitter<void>();

  deselect() {
    this.removeSubject.next()
  }

}
