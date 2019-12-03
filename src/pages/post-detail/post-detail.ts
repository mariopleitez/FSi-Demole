import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { DeepDonatePage } from './../deep-donate/deep-donate';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentsProvider } from './../../providers/payments/payments';

@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  post: any;
  userId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, private paymentProvider: PaymentsProvider, public localStorage: Storage, public alertCtrl: AlertController) {

    this.post = this.navParams.get("post");
    //console.log(this.post);
    this.localStorage.get('user').then((value) => {
      this.userId = value;
    });

    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // en
    
  }

  // ionViewWillEnter() {
  //   let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //     Object.keys(tabs).map((key) => {
  //       tabs[ key ].style.transform = 'translateY(56px)';
  //     });
  //   } // end if
  // }

  // ionViewDidLeave() {
  //   let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //     Object.keys(tabs).map((key) => {
  //       tabs[ key ].style.transform = 'translateY(0)';
  //     });
  //   } // end if
  // }

  deepDonate(post){
    this.storage.get("user").then( (data) => {
      if(data != null){
        this.navCtrl.push(DeepDonatePage, {"post": post});
      }else{
        this.navCtrl.push(LoginPage, {"next": DeepDonatePage, "post": post})
      }
    })
  }

  toggleLiked(post: any) {
    console.log(post);
    console.log(this.userId);
    var like = 0;
    if( this.userId ){
        // Hacer el request al admin para quitar o aumentar el post
        if (post.icon === 'heart') {
          post.icon = 'heart-outline';
          post.likes_count--;
          like = 0;
        } else {
          post.icon = 'heart';
          post.likes_count++;
          like = 1;
        }

        let postParams =
        {
          'post': post.id,
          'like': like
        }

        this.paymentProvider.setLikes(postParams)
          .catch(error => {
              if(error.error.message){
                    this.alertCtrl
                    .create({ title: "Error", message: error.error.message, buttons: [{
                        text: 'Ok'
                    }]})
                    .present();
              }else{
                    this.alertCtrl
                    .create({ title: "Error", message: "No usamos cordova", buttons: [{
                        text: 'Ok'
                    }]})
                    .present();
              }

          });
    }else{
      this.navCtrl.push(LoginPage);
    }




}

}
