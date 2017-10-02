import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav } from 'ionic-angular';
import { Page } from '../../models/page';
import { CompassSlider } from './compass-slider.component';
import { CompassDynamicViewer } from '../common/compass-dynamic-viewer.component';

@Component({
  selector: 'compass-menu',
  templateUrl: 'compass-menu.html'
})
export class CompassMenu {

  constructor(private nav: Nav) {
  }

  public goToDynamicPage(page:string) {
        this.nav.setRoot(CompassDynamicViewer, {
            "page": page
        })
  }

}