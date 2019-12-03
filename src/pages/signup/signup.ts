import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../app/models/user-model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


//@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = {
    name: "",
    email: "",
    password: ""
  };


  confirmPassword: string;
  url: string;
  headers: Headers;
  result:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loginProvider: LoginProvider, public http:HttpClient) {
    // this.headers = new Headers();
    // this.headers.append("X-Parse-Application-Id", "AppId1");
  }

  goToLogin(){
    this.navCtrl.pop();
  }

  signup() {

    this.result = '';
    if(this.user.password === "" || this.user.name === "" || this.user.email === ""){
          this.alertCtrl.create({
            title: "Error",
            message: "Complete todos los campos del formulario",
            buttons: ["OK"]
        }).present();
        return;
    }
    if(this.user.password != this.confirmPassword){
          this.alertCtrl.create({
              title: "Error",
              message: "Passwords do not match. Please retry",
              buttons: ["OK"]
          }).present();
          return;
    }


    let postSignUp =
    {
      "name": this.user.name,
      "email": this.user.email,
      "password": this.user.password,
      "password_confirmation": this.confirmPassword
    }


     this.loginProvider.doRegister(postSignUp)
      .then(data => {
           this.alertCtrl
            .create({ title: "Success", message: "Congratulations. Account has been created. Please login", buttons:[{
              text: 'Login',
              handler: () => {
                this.navCtrl.pop(); //takes the user back to login
              }
            }]})
            .present();
      });
  }
}
