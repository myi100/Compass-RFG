import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav } from 'ionic-angular';
import { Page } from '../../models/page';
import { CompassMenu } from './compass-menu.component';
import { CompassTodos } from './compass-todos.component';

@Component({
  selector: 'compass-tabs',
  templateUrl: 'compass-tabs.html'
})
export class CompassTabs {

    pageMenu = CompassMenu;
    pageTodos = CompassTodos;

  constructor(private nav: Nav) {
  }

}