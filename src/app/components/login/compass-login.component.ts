import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { IonicModule, Nav, Slides, NavParams, NavController } from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {CompassWelcome} from '../main/compass-welcome.component';

@Component({
  selector: 'compass-login',
  templateUrl: 'compass-login.html'
})
export class CompassLogin {

  @ViewChild(Slides) slides : Slides;

  constructor(private loginService: LoginService, private navctr: NavController, private navparams: NavParams) {
  }

  public goToNextPage() {
    this.slides.slideNext();
  }

  public goToPrevPage() {
    this.slides.slidePrev();
  }

  public login() {
    this.loginService.login();
  }

  public backToWelcome() {
    this.navctr.setRoot(CompassWelcome);
  }


}