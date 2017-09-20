import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class MenuInteractionService {

  // Observable string sources
   menuOpenSource = new Subject<boolean>();
   menuCloseSource = new Subject<void>();

  // Observable string streams
  public openMenu$ = this.menuOpenSource.asObservable();
  public closeMenu$ = this.menuCloseSource.asObservable();



  // Service message commands
  openMenu() {
    this.menuOpenSource.next(true);
  }

  closeMenu() {
    this.menuCloseSource.next();
  }

}
