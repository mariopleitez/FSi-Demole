import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { SignupPage } from './../signup/signup';
import { User } from '../../app/models/user-model';
import { LoginProvider } from '../../providers/login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, AlertController, NavParams, Nav, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import 'rxjs/add/operator/map';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = {
    email: "",
    password: ""
  }

  url: string;
  headers: any;
  authdata: any;
  userData: any;

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  constructor(public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public localStorage: Storage, private loginProvider: LoginProvider, public http:HttpClient, private facebook: Facebook, public gp: GooglePlus, private loadingCtrl: LoadingController) {
    this.headers = new HttpHeaders().set("X-Parse-Application-Id", "AppId1")
                                    .set('Content-Type', 'application/json');
  }

  loginWithGoogle(){
    this.gp.login({})
    .then(res => {
     // console.log(res);
      this.displayName = res.displayName;
      this.email       = res.email;
      this.familyName  = res.familyName;
      this.givenName   = res.givenName;
      this.userId      = res.userId;
      this.imageUrl    = res.imageUrl;

      this.handleSocialLogin(this.email, this.displayName, this.imageUrl, 'google');

      // this.alertCtrl
      //   .create({ title: "EXITO CON GOOGLE", message: this.displayName+' '+this.email, buttons: ['OK']})
      //   .present();
      //this.isLoggedIn = true;
    })
    .catch(err => console.error(err));
  }


  // loginWithFB() {
  //     this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
  //       this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
  //         this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
  //         this.alertCtrl
  //             .create({ title: "EXITO", message: this.userData.username+' '+this.userData.email, buttons: ['OK']})
  //             .present();
  //       });
  //     });
  // }


  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.handleSocialLogin(profile['email'], profile['name'], profile['picture_large']['data']['url'], 'facebook');
      });
    });
}




  handleSocialLogin(email, name, image, social){

    let postParams =
      {
        'email': email,
        'name': name,
        'image': image,
        'social': social
      }

    this.loginProvider.doSocialLogin(postParams)
    .then(data => {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

            this.authdata = data;
            this.localStorage.set('user', this.authdata.access_token).then(() =>{
                 this.localStorage.set('name', postParams.email);

            this.loginProvider.isAuthenticated = "Logout";

            this.loginProvider.getAuthData.name = postParams.name;
            this.loginProvider.getAuthData.email = postParams.email;
            this.loginProvider.getAuthData.image = postParams.image;
            this.loginProvider.getAuthData.provider = postParams.social;

            loading.dismiss();

            if(this.navCtrl.length() > 0){
              this.navCtrl.setRoot('MenuPage');
            }else{
              this.navCtrl.pop();
            }

          })
    })
    .catch(err => {
      this.alertCtrl
        .create({ title: "ERROR CON FB", message: err, buttons: ['OK']})
        .present();
    });
  }


  doLogin() {

    if (!(this.user.email && this.user.password)) {
      this.alertCtrl
        .create({ title: "Error", message: "Verifique el usuario o password e intente nuevamente", buttons: ['OK']})
        .present();
        return;
    }


    let postParams =
      {
        'grant_type': 'password',
        'client_id': '3',
        'client_secret': 'DjlursNyMXyw07dbrJrPCBw7N8fB0XkmACq352JD',
        'username': this.user.email,
        'password': this.user.password,
        'scope': '',
      }


     this.loginProvider.doLogin(postParams)
      .then(data => {
        this.authdata = data;
        this.localStorage.set('user', this.authdata.access_token).then(() =>{


          this.loginProvider.isAuthenticated = "Logout";
          this.loginProvider.getAuthData.name = this.user.email;
          this.localStorage.set('name', this.user.email);

            if(this.navParams.get("tab")){
               this.navCtrl.pop();
               this.navCtrl.setRoot('TabsPage', {tabIndex: 2});
            }else if(this.navParams.get("next")){
                if(this.navParams.get("post")){
                    this.navCtrl.push(this.navParams.get("next"),{"post": this.navParams.get("post")});
                }else{
                   this.navCtrl.push(this.navParams.get("next"));
                }
            } else {
                if(this.navCtrl.length() > 0){
                  this.navCtrl.setRoot('MenuPage');
                }else{
                  this.navCtrl.pop();
                }
            }

        })
      });
  }


  // doLoginSocialProvider(provider:string){
  //   if(provider){
  //     //this.url= "http://50.18.144.251/demos/funda-sierra/public/api/auth/"+provider;
  //     this.url = "http://34.234.90.63/api/auth/"+provider;

  //     this.http.get(this.url, {headers:this.headers}).subscribe(res => {
  //         console.log(res);
  //         console.log('aca ' + res);

  //         this.alertCtrl
  //           .create({ title: "Exito", message: res.text(), buttons: [{
  //               text: 'Ok'
  //           }]})
  //         .present();

  //         // navigate the user to the main app page
  //           this.localStorage.set('user', res.json().access_token).then(() =>{
  //                this.navCtrl.setRoot('MenuPage');
  //           })
  //     }, err => {
  //         console.log('aca2: '+err);
  //         this.alertCtrl
  //           .create({ title: "Error", message: err.text(), buttons: [{
  //               text: 'Ok'
  //           }]})
  //         .present();
  //     })

  //   }

  // }


  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }



}
