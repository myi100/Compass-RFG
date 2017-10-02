var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Nav, NavParams } from 'ionic-angular';
import { ResourceServices } from '../../services/resource.service';
var CompassDynamicViewer = /** @class */ (function () {
    function CompassDynamicViewer(resourceService, nav, navparams) {
        this.resourceService = resourceService;
        this.nav = nav;
        this.navparams = navparams;
        this.dynamicProps = [];
    }
    CompassDynamicViewer.prototype.getJson = function () {
        this.resourceService.getJSON("file").subscribe(function (data) {
        });
    };
    CompassDynamicViewer = __decorate([
        Component({
            selector: 'compass-dynamic-viewer',
            templateUrl: 'compass-dynamic-viewer.html'
        }),
        __metadata("design:paramtypes", [ResourceServices, Nav, NavParams])
    ], CompassDynamicViewer);
    return CompassDynamicViewer;
}());
export { CompassDynamicViewer };
//# sourceMappingURL=compass-dynamic-viewer.component.js.map