import { Component, OnInit, Input, ViewChild, NgModule, Output, EventEmitter } from '@angular/core';
import { Slides, Nav } from 'ionic-angular';
import { ResourceServices } from '../../services/resource.service';
import { ParentVisibleService } from '../../services/parent-visible.service';
import { Page } from '../../models/page';

import { CompassLogin } from '../login/compass-login.component';

@Component({
  selector: 'compass-slider',
  templateUrl: 'compass-slider.html',
  providers: [ResourceServices]
})
export class CompassSlider implements OnInit {

  private _appService: ResourceServices;
  private json:any;
  private pages: Page[] = [];
  public dynamicProps: any;
  public components: any;
  public navControlSet: boolean;
  @Input() navControl: Nav;
  @Input() filesGroup: string;
  @ViewChild(Slides) slides: Slides;
  
  constructor(appService: ResourceServices, private parentVisibileService: ParentVisibleService) {
    this.navControlSet = false;
    this._appService = appService;
    this.dynamicProps = { 
        goToNextPage: this.goToNextPage.bind(this), 
        goToPrevPage: this.goToPrevPage.bind(this),
        goToPage: this.goToPage.bind(this)
    };

    this.components = [
        { title: 'CompassLogin', component: CompassLogin }
      ];

  }

  private getJson() : void {
    this._appService.getJSON("file").subscribe(data => { 
      this.populateJson(data);
      this.populatePages();
    });
  }

  private populateJson(data: any): void {
    var self = this;
    this.json = data.find((obj:any) => {
      return obj.groupname === self.filesGroup;
    })
  }

  private populatePages() : void {
    for(let i = 0; i < this.json.pages.length; i++ ) {
       let newPage = new Page();
       newPage.name = this.json.pages[i].name;
       newPage.template = this.json.pages[i].template;
       this.pages.push(newPage);
    }
  }

  public goToFirstPage() {
    //go back to first page
    this.slides.slideTo(0);
  }

  public goToNextPage() {
    this.slides.slideNext();
  }

  public goToPrevPage() {
    this.slides.slidePrev();
  }

  public goToPage(page){

    this.navControlSet = true;

    this.parentVisibileService.setVisibility(false);
    
    this.navControl.setRoot(this.components.find(function(elem){

        if(elem.title === page)
        {
            return true;
        }

    }).component, {
      "slider": this
    });
  }

  public showParent(show: boolean) {
    this.parentVisibileService.setVisibility(show);
  }

  ngOnInit(): void {
    if(this.filesGroup){
      this.getJson();
    }
  }

}
