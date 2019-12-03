
// import { Tab3Page } from './../pages/tab3/tab3';
import { DeepDonatePage } from './../pages/deep-donate/deep-donate';
import { HttpClientModule } from '@angular/common/http';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { PostDetailPage } from '../pages/post-detail/post-detail';
// import { MenuPage } from '../pages/menu/menu';
import { MenuPageModule } from '../pages/menu/menu.module';
import { LoginProvider } from '../providers/login/login';
import { PostProvider } from '../providers/post/post';
import { PaymentsProvider } from '../providers/payments/payments';
import { Facebook } from '@ionic-native/facebook';
import { Stripe } from '@ionic-native/stripe';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicSelectableModule } from 'ionic-selectable';
import { OneSignal } from '@ionic-native/onesignal';

import { ComponentsModule } from './../components/components.module';
import { DirectivesModule } from './../directives/directives.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// polyfills
import 'intersection-observer';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    PostDetailPage,
    DeepDonatePage,
    PerfilPage
  ],
  imports: [
    MenuPageModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicSelectableModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    DirectivesModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    PostDetailPage,
    DeepDonatePage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   // Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    PostProvider,
    PaymentsProvider,
    Stripe,
    Facebook,
    GooglePlus,
    OneSignal,
    InAppBrowser
  ]
})
export class AppModule {}
