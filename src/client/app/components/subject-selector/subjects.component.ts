import {Component, Input} from '@angular/core';
import {SubjectType} from "../../shared/data-types/subject.type";

@Component({
  selector: 'subject-selector',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css']
})
export class SubjectsComponent {

  @Input() subjectList: SubjectType[];
  @Input() areaId: number;
  @Input() type: string;

}
