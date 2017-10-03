import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav, Slides } from 'ionic-angular';
import { Page } from '../../models/page';
import { CompassSlider } from './compass-slider.component';
import { CompassLogin } from '../login/compass-login.component';

@Component({
  selector: 'compass-welcome',
  templateUrl: 'compass-welcome.html'
})
export class CompassWelcome {

  @ViewChild(Slides) slides : Slides;

  constructor(private nav: Nav) {
  }

  public goToNextPage(page) {
    this.slides.slideNext();
  }

  public goToPrevPage(page) {
    this.slides.slidePrev();
  }

  public goToLogin(page) {
    this.nav.setRoot(CompassLogin);
  }

}