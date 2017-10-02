import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav } from 'ionic-angular';
import { Page } from '../../models/page';
import { CompassSlider } from './compass-slider.component';
import { LoginService } from '../../services/login.service';
import { CompassWelcome } from './compass-welcome.component';
import { CompassMenu } from './compass-menu.component';

@Component({
  selector: 'compass-main',
  templateUrl: 'compass-main.html'
})
export class CompassMain implements OnInit {

  @ViewChild(Nav) navObj : Nav
  public loggedin: boolean = false;

  constructor(private loginService: LoginService) {
  }

  public bindLoginService() {
    this.loginService.loggedInStatus$.subscribe(
      loggedIn => {     

        if(this.loggedin !== loggedIn) {

          this.loggedin = loggedIn;

            //if not logged in set root to welcome screen
            if(!this.loggedin) {
              this.navObj.setRoot(CompassWelcome);
            }
            else {
              this.navObj.setRoot(CompassMenu);
            }
        }

      });
  }

  public goToPage(page) {
      this.navObj.setRoot(page);
  }

  ngOnInit() {
    this.bindLoginService();
    this.goToPage(CompassWelcome);
  }

}