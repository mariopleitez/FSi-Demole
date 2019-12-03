import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  tab:Tabs;
  selectedSegment: any;
  showDonaciones: any;
  showSubscripciones: any;
  showUnread: any;
  slides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.selectedSegment = "donaciones"; //all, read, unread
    this.showDonaciones = true;

    this.tab = this.navCtrl.parent;
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


    this.slides = [
      {
        title: "Welcome to the Docs!",
        description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
        image: "assets/imgs/ica-slidebox-img-1.png",
      },
      {
        title: "What is Ionic?",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "assets/imgs/ica-slidebox-img-2.png",
      },
      {
        title: "What is Ionic Cloud?",
        description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "assets/imgs/ica-slidebox-img-3.png",
      }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
   // this.tab.select(1);
  }


  onSegmentChanged(segmentButton: any) {

    // console.log(segmentButton)
    if (segmentButton.value === "donaciones") {
      this.showDonaciones = true;
      this.showSubscripciones = false;
      this.showUnread = false;
    } else if(segmentButton.value === "subscripciones") {
      this.showSubscripciones = true;
      this.showDonaciones = false;
      this.showUnread = false
    }else{
      this.showUnread = true;
      this.showSubscripciones = false;
      this.showDonaciones = false;
    }
    this.selectedSegment = segmentButton.value;

  }

}
