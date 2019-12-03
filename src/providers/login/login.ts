import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginProvider {

  url:string;
  result:string;
  public isAuthenticated = "Login";
  public getName = "test";
  public getAuthData:any;

  constructor(public http: HttpClient, public localStorage: Storage, public alertCtrl: AlertController) {
    this.getAuthData = {};
  }



  doSocialLogin(postParams){

    this.url= "http://34.202.156.31/api/oauth/personaltoken";

    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(postParams), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err.error.message);
            this.alertCtrl
            .create({ title: "Error", message: err.error.message, buttons: [{
                text: 'Ok'
            }]})
          .present();
        });
    });


  }



  doLogin(postParams) {
    this.url= "http://34.202.156.31/api/oauth/token";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(postParams), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err.error.message);
            this.alertCtrl
            .create({ title: "Error", message: err.error.message, buttons: [{
                text: 'Ok'
            }]})
          .present();
        });
    });
  }

  doRegister(postParams){
    this.url= "http://34.202.156.31/api/users";
    this.result = "<p>Corrija los siguientes errores en el formulario: </p><ul>";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(postParams), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          for(let p in err.error.error){
            if( err.error.error.hasOwnProperty(p) ) {
                if(err.error.error[p][0] !== undefined){
                  this.result += '<li>'+err.error.error[p][0] + "</li>";
                }
              }
          }
          this.result += "</ul>";
          console.log(this.result);
          this.alertCtrl
            .create({ title: "Error", message: this.result, buttons: [{
                text: 'Ok'
            }]})
          .present();
        });
    });
  }

}
