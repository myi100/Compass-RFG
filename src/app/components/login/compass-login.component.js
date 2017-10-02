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
import { Slides, NavParams, NavController } from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import { CompassWelcome } from '../main/compass-welcome.component';
var CompassLogin = /** @class */ (function () {
    function CompassLogin(loginService, navctr, navparams) {
        this.loginService = loginService;
        this.navctr = navctr;
        this.navparams = navparams;
    }
    CompassLogin.prototype.goToNextPage = function () {
        this.slides.slideNext();
    };
    CompassLogin.prototype.goToPrevPage = function () {
        this.slides.slidePrev();
    };
    CompassLogin.prototype.login = function () {
        this.loginService.login();
    };
    CompassLogin.prototype.backToWelcome = function () {
        this.navctr.setRoot(CompassWelcome);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], CompassLogin.prototype, "slides", void 0);
    CompassLogin = __decorate([
        Component({
            selector: 'compass-login',
            templateUrl: 'compass-login.html'
        }),
        __metadata("design:paramtypes", [LoginService, NavController, NavParams])
    ], CompassLogin);
    return CompassLogin;
}());
export { CompassLogin };
//# sourceMappingURL=compass-login.component.js.map