var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var LoginService = /** @class */ (function () {
    function LoginService() {
        this.loggedInStatus = new Subject();
        this.loggedInStatus$ = this.loggedInStatus.asObservable();
    }
    LoginService.prototype.login = function () {
        //mimic for now logging in
        this.loggedInStatus.next(true);
    };
    LoginService.prototype.logout = function () {
        //mimic for now logging out
        this.loggedInStatus.next(false);
    };
    LoginService = __decorate([
        Injectable()
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map