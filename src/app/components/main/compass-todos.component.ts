import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav } from 'ionic-angular';
import { Page } from '../../models/page';

@Component({
  selector: 'compass-todos',
  templateUrl: 'compass-todos.html'
})
export class CompassTodos {

  constructor(private nav: Nav) {
  }

}