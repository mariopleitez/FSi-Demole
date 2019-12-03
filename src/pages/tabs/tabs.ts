import { Tab3Page } from './../tab3/tab3';
import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavParams, ModalController, NavController, Tabs, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})


export class TabsPage {

 // @ViewChild('myTabs') tabRef: Tabs;

  tab1Root: any = 'Tab1Page';
  tab2Root: any = 'Tab2Page';
  tab3Root: any = 'Tab3Page';
  myIndex: number;

  @ViewChild('myTabs') tabRef: Tabs;
  @ViewChild(Nav) nav: Nav;

  constructor(public modalCtrl:ModalController, navParams: NavParams, public storage: Storage, public navCtrl: NavController) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }

  chat() {
    this.storage.get("user").then( (data) => {
      if(data != null){
          //console.log(this.myIndex);
          //this.app.getActiveNavs()[0].parent.select(2);
          //this.tabRef.select(2);
          //console.log("aca");
         //this.navCtrl.push(Tab3Page);
         // this.navCtrl.parent.select(2);
      }else{
        //  let modal = this.modalCtrl.create(LoginPage);
        //  modal.present();
        this.navCtrl.push(LoginPage, {"tab": Tab3Page})
      }
    })
    // let modal = this.modalCtrl.create(LoginPage);
    // modal.present();
  }

}
