import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import { OneSignal  } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LoginPage;
  rootPage:any = MenuPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private oneSignal: OneSignal) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(isCordovaAvailable()){
        this.initializeOneSignal();
      }

    });
  }


  initializeOneSignal(){
    this.oneSignal.startInit('5fe1994b-0ebe-41b5-a96d-5ce7ce875b3e', '343876182019');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
      // do something when a notification is opened
      alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });

    this.oneSignal.endInit();
  }



}

