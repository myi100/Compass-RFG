var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CompassMain } from './components/main/compass-main.component';
import { CompassWelcome } from "./components/main/compass-welcome.component";
import { CompassSlider } from './components/main/compass-slider.component';
import { CompassMenu } from './components/main/compass-menu.component';
import { CompassLogin } from './components/login/compass-login.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Safe } from './pipes/safeHtml.pipe';
import { ResourceServices } from './services/resource.service';
import { LoginService } from './services/login.service';
import { ParentVisibleService } from './services/parent-visible.service';
import { Dynamic } from './components/common/dynamic.component';
import { CompassDynamicViewer } from './components/common/compass-dynamic-viewer.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                Safe,
                Dynamic,
                CompassMain,
                CompassWelcome,
                CompassSlider,
                CompassMenu,
                CompassLogin,
                CompassDynamicViewer
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                Dynamic,
                CompassMain,
                CompassWelcome,
                CompassSlider,
                CompassMenu,
                CompassLogin,
                CompassDynamicViewer
            ],
            providers: [
                StatusBar,
                SplashScreen,
                ResourceServices,
                LoginService,
                ParentVisibleService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map