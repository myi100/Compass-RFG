import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class LoginService {
 
  private loggedInStatus = new Subject<boolean>();
 
  loggedInStatus$ = this.loggedInStatus.asObservable();
 
  login() {
    //mimic for now logging in
    this.loggedInStatus.next(true);
  }

  logout() {
    //mimic for now logging out
    this.loggedInStatus.next(false);
  }
}