import { Component, OnInit, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule, Slides } from 'ionic-angular';
import { Page } from '../../models/page';

@Component({
  selector: 'dynamic',
  template: '<div #container></div>'
})
export class Dynamic implements OnInit {

  @Input() page : Page;
  @Input() properties: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private compiler: Compiler ) {
  }

  ngOnInit() : void {
    let self = this;

    if(this.page) {
      let htmlTemp  = this.page.template;

      this.addComponent(htmlTemp, this.properties);
    }
  }

  public addComponent(template: string, properties: any = {}) {
    @Component({
      selector: "compass-dynamic",
      template: template
    })
    class TemplateComponent implements OnInit {
        @ViewChild(Slides)slider: Slides;
        ngOnInit() : void {
            if(properties.OnInit) {
                properties.OnInit();
            }
        }
    }

    @NgModule({declarations: [TemplateComponent ], imports: [IonicModule.forRoot(TemplateComponent)]})
    class TemplateModule {}

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);  
    Object.assign(component.instance, properties);
    // component.changeDetectorRef.detectChanges();
  }

}