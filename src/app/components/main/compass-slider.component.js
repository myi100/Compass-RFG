var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { Slides, Nav } from 'ionic-angular';
import { ResourceServices } from '../../services/resource.service';
import { ParentVisibleService } from '../../services/parent-visible.service';
import { Page } from '../../models/page';
import { CompassLogin } from '../login/compass-login.component';
var CompassSlider = /** @class */ (function () {
    function CompassSlider(appService, parentVisibileService) {
        this.parentVisibileService = parentVisibileService;
        this.pages = [];
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
    CompassSlider.prototype.getJson = function () {
        var _this = this;
        this._appService.getJSON("file").subscribe(function (data) {
            _this.populateJson(data);
            _this.populatePages();
        });
    };
    CompassSlider.prototype.populateJson = function (data) {
        var self = this;
        this.json = data.find(function (obj) {
            return obj.groupname === self.filesGroup;
        });
    };
    CompassSlider.prototype.populatePages = function () {
        for (var i = 0; i < this.json.pages.length; i++) {
            var newPage = new Page();
            newPage.name = this.json.pages[i].name;
            newPage.template = this.json.pages[i].template;
            this.pages.push(newPage);
        }
    };
    CompassSlider.prototype.goToFirstPage = function () {
        //go back to first page
        this.slides.slideTo(0);
    };
    CompassSlider.prototype.goToNextPage = function () {
        this.slides.slideNext();
    };
    CompassSlider.prototype.goToPrevPage = function () {
        this.slides.slidePrev();
    };
    CompassSlider.prototype.goToPage = function (page) {
        this.navControlSet = true;
        this.parentVisibileService.setVisibility(false);
        this.navControl.setRoot(this.components.find(function (elem) {
            if (elem.title === page) {
                return true;
            }
        }).component, {
            "slider": this
        });
    };
    CompassSlider.prototype.showParent = function (show) {
        this.parentVisibileService.setVisibility(show);
    };
    CompassSlider.prototype.ngOnInit = function () {
        if (this.filesGroup) {
            this.getJson();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Nav)
    ], CompassSlider.prototype, "navControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CompassSlider.prototype, "filesGroup", void 0);
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], CompassSlider.prototype, "slides", void 0);
    CompassSlider = __decorate([
        Component({
            selector: 'compass-slider',
            templateUrl: 'compass-slider.html',
            providers: [ResourceServices]
        }),
        __metadata("design:paramtypes", [ResourceServices, ParentVisibleService])
    ], CompassSlider);
    return CompassSlider;
}());
export { CompassSlider };
//# sourceMappingURL=compass-slider.component.js.map