import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from './services/login.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Menu) menu : Menu;

  public loggedin: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private loginService: LoginService) {
    loginService.loggedInStatus$.subscribe(
      loggedIn => {
        this.loggedin = loggedIn;
      });
  }

  public logout() {
    this.menu.swipeEnabled = false;
    this.loginService.logout();
  }
}
