import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Nav, NavParams } from 'ionic-angular';
import { Page } from '../../models/page';
import { ResourceServices } from '../../services/resource.service';
import { Dynamic } from './dynamic.component'; 

@Component({
  selector: 'compass-dynamic-viewer',
  templateUrl: 'compass-dynamic-viewer.html'
})
export class CompassDynamicViewer implements OnInit {

  public dynamicProps: any = [];
  public setPage: Page;

  @ViewChild(Dynamic)dynamic : Dynamic;

  constructor(private resourceService: ResourceServices, private nav: Nav, private navparams: NavParams) {
    this.dynamicProps = { 
      goToNextPage: () => {
        (<any>this).slider.slideNext();
      },
      goToPrevPage: () => {
        (<any>this).slider.slidePrev();
      }
    };

  }

  ngOnInit() {
    this.getHtml();
  }

  private getHtml(): void {
    this.resourceService.getHtml("assets/pages/justarrived/index.html").subscribe(data => {
      this.setPage = <Page>{
        name: "justarrived",
        template: data._body
      }

      this.dynamic.page = this.setPage;
      this.dynamic.addComponent(this.setPage.template, this.dynamicProps);

    });
  }

  private getJson() : void {
    this.resourceService.getJSON("file").subscribe(data => { 

    });
  }

}