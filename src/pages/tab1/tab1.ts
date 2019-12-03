import { PostProvider } from './../../providers/post/post';
import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { PostDetailPage } from '../post-detail/post-detail';
import { LoginPage }  from '../login/login';
import { PaymentsProvider } from './../../providers/payments/payments';

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  cards: any;
  category: string = 'gear';
  posts: any;
  url: string;
  userId: string;
  nexturl: string;
  page = 1;
  totalPage = 0;
  icon: string;

  constructor(public _app: App,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public localStorage: Storage,  public http:HttpClient, public postsProvider: PostProvider, public loadingCtrl: LoadingController, private login: LoginProvider, private paymentProvider: PaymentsProvider) {
    this.icon = "heart-outline";
    this.localStorage.get('user').then((value) => {
      this.userId = value;
      this.getPosts(null);
    });
    console.log(this.login.getAuthData);
  }

  openPost(post){
    this.navCtrl.push(PostDetailPage, {"post": post});
  }

  getPosts(refresher){
    this.postsProvider.getPosts(null)
    .then(data => {
      this.posts = data['data']['data'];
     // console.log(this.posts);
      this.nexturl = data["data"]["next_page_url"];
      this.totalPage = data["data"]["last_page"];
      if (refresher !== null) {
        refresher.complete();
        this.page = 1;
      }
     // console.log(this.empresas);
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.page = this.page + 1;
      this.postsProvider.getPosts(this.nexturl)
      .then(data => {
        //console.log(data['data']['data']);
        for (var i = 0; i < data["data"]["data"].length; i++) {
          this.posts.push(data["data"]["data"][i]);
        }
        this.nexturl = data["data"]["next_page_url"];
        infiniteScroll.complete();
      });
    }, 300);
  }

  toggleLiked(post: any) {
      // console.log(post);
      // console.log(this.userId);
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

  logout(){
    this.localStorage.remove('user').then(() => {
        //this._app.getRootNav().push(MenuPage);
        //this._app.getRootNav().setRoot(LoginPage);
       // this._app.getRootNav().setRoot('MenuPage');
        //this._app.getRootNav().push(MenuPage);

        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        this.localStorage.remove('name').then(() => {
            loading.present();

          setTimeout(() => {
            loading.dismiss();
            this.login.isAuthenticated = "Login";
            this.login.getName = undefined;
            this._app.getRootNav().popToRoot();
          }, 300);
        })

        
    });
  }

  onClear(env: any){
    this.getPosts(null);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
  //  this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.posts = this.posts.filter((item) => {
        console.log(item.name);
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
