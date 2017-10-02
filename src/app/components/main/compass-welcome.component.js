var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Slides } from 'ionic-angular';
import { CompassLogin } from '../login/compass-login.component';
var CompassWelcome = /** @class */ (function () {
    function CompassWelcome(nav) {
        this.nav = nav;
    }
    CompassWelcome.prototype.goToNextPage = function (page) {
        this.slides.slideNext();
    };
    CompassWelcome.prototype.goToNextPrev = function (page) {
        this.slides.slidePrev();
    };
    CompassWelcome.prototype.goToLogin = function (page) {
        this.nav.setRoot(CompassLogin);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], CompassWelcome.prototype, "slides", void 0);
    CompassWelcome = __decorate([
        Component({
            selector: 'compass-welcome',
            templateUrl: 'compass-welcome.html'
        }),
        __metadata("design:paramtypes", [Nav])
    ], CompassWelcome);
    return CompassWelcome;
}());
export { CompassWelcome };
//# sourceMappingURL=compass-welcome.component.js.map