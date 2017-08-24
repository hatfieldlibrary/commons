import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeScreenComponent  {
}
