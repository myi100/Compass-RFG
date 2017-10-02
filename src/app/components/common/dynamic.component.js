var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, Compiler, NgModule, ViewContainerRef } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Page } from '../../models/page';
var Dynamic = /** @class */ (function () {
    function Dynamic(compiler) {
        this.compiler = compiler;
    }
    Dynamic.prototype.ngOnInit = function () {
        var self = this;
        var htmlTemp = this.page.template;
        this.addComponent(htmlTemp, this.properties);
    };
    Dynamic.prototype.addComponent = function (template, properties) {
        if (properties === void 0) { properties = {}; }
        var TemplateComponent = /** @class */ (function () {
            function TemplateComponent() {
            }
            TemplateComponent.prototype.ngOnInit = function () {
                if (properties.OnInit) {
                    properties.OnInit();
                }
            };
            TemplateComponent = __decorate([
                Component({ template: template })
            ], TemplateComponent);
            return TemplateComponent;
        }());
        var TemplateModule = /** @class */ (function () {
            function TemplateModule() {
            }
            TemplateModule = __decorate([
                NgModule({ declarations: [TemplateComponent], imports: [IonicModule.forRoot(TemplateComponent)] })
            ], TemplateModule);
            return TemplateModule;
        }());
        var mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        var factory = mod.componentFactories.find(function (comp) {
            return comp.componentType === TemplateComponent;
        });
        var component = this.container.createComponent(factory);
        Object.assign(component.instance, properties);
        // component.changeDetectorRef.detectChanges();
    };
    __decorate([
        Input(),
        __metadata("design:type", Page)
    ], Dynamic.prototype, "page", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Dynamic.prototype, "properties", void 0);
    __decorate([
        ViewChild('container', { read: ViewContainerRef }),
        __metadata("design:type", ViewContainerRef)
    ], Dynamic.prototype, "container", void 0);
    Dynamic = __decorate([
        Component({
            selector: 'dynamic',
            template: '<div #container></div>'
        }),
        __metadata("design:paramtypes", [Compiler])
    ], Dynamic);
    return Dynamic;
}());
export { Dynamic };
//# sourceMappingURL=dynamic.component.js.map