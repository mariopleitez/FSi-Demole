import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Tab1Page } from '../tab1/tab1'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  name: string;
  noProfile: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage) {

    this.localStorage.get('name').then((val) => {
        this.name = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  openFirstPage(){
  	this.navCtrl.push(Tab1Page)
  }

}
