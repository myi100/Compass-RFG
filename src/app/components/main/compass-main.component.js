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
import { Nav } from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import { CompassWelcome } from './compass-welcome.component';
import { CompassMenu } from './compass-menu.component';
var CompassMain = /** @class */ (function () {
    function CompassMain(loginService) {
        this.loginService = loginService;
        this.loggedin = false;
        this.bindLoginService();
    }
    CompassMain.prototype.bindLoginService = function () {
        var _this = this;
        this.loginService.loggedInStatus$.subscribe(function (loggedIn) {
            if (_this.loggedin !== loggedIn) {
                //if not logged in set root to welcome screen
                if (!_this.loggedin) {
                    _this.navObj.setRoot(CompassWelcome);
                }
                else {
                    _this.navObj.setRoot(CompassMenu);
                }
            }
        });
    };
    CompassMain.prototype.goToPage = function (page) {
        this.navObj.setRoot(page);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], CompassMain.prototype, "navObj", void 0);
    CompassMain = __decorate([
        Component({
            selector: 'compass-main',
            templateUrl: 'compass-main.html'
        }),
        __metadata("design:paramtypes", [LoginService])
    ], CompassMain);
    return CompassMain;
}());
export { CompassMain };
//# sourceMappingURL=compass-main.component.js.map