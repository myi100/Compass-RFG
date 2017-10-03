import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CompassMain } from './components/main/compass-main.component';
import { CompassWelcome } from "./components/main/compass-welcome.component";
import { CompassMenu } from './components/main/compass-menu.component';
import { CompassLogin} from './components/login/compass-login.component';
import { CompassTabs} from './components/main/compass-tabs.component';
import { CompassTodos} from './components/main/compass-todos.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Safe } from './pipes/safeHtml.pipe';

import {ResourceServices} from './services/resource.service';
import {LoginService} from './services/login.service';

import { Dynamic } from './components/common/dynamic.component';
import { CompassDynamicViewer } from './components/common/compass-dynamic-viewer.component';

@NgModule({
  declarations: [
    MyApp,
    Safe,
    Dynamic,
    CompassMain,
    CompassWelcome,
    CompassMenu,
    CompassLogin,
    CompassDynamicViewer,
    CompassTabs,
    CompassTodos
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
    CompassMenu,
    CompassLogin,
    CompassDynamicViewer,
    CompassTabs,
    CompassTodos
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ResourceServices,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
