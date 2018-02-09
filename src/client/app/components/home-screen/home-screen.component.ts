import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeScreenComponent  {
}
