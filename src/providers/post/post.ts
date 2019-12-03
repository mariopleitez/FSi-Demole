import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

  apiUrl = 'http://34.202.156.31/api';
  //apiUrl = 'http://laravelapi.test';
  url:string;
  userId: string;
  constructor(public http: HttpClient, public alertCtrl: AlertController, public localStorage: Storage) {
    this.localStorage.get('user').then((value) => {
      this.userId = value;
    });
  }


  getPosts(url){
    return new Promise(resolve => {
      if(url){
          if(this.userId){
              this.http.get(url, {headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.userId)}).subscribe(data => {
                resolve(data);
              }, err => {
                console.log(err);
              });
          }else{
              this.http.get(url).subscribe(data => {
                resolve(data);
              }, err => {
                console.log(err);
              });
          }
      }else{
        if(this.userId){
            this.http.get(this.apiUrl+'/posts', {headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.userId)}).subscribe(data => {
              resolve(data);
            }, err => {
              console.log(err.error.error);
              this.alertCtrl
                .create({ title: "Error", message: err.error.error, buttons: [{
                    text: 'Ok'
                }]})
              .present();
            });
        }else{
            this.http.get(this.apiUrl+'/posts').subscribe(data => {
              resolve(data);
            }, err => {
              console.log(err.error.error);
              this.alertCtrl
                .create({ title: "Error", message: err.error.error, buttons: [{
                    text: 'Ok'
                }]})
              .present();
            });
        }

      }
    });
  }


  getDetail(id){
    console.log(id);
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/empresas/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err.error.error);
          this.alertCtrl
            .create({ title: "Error", message: err.error.error, buttons: [{
                text: 'Ok'
            }]})
          .present();
      });
    });
  }



}
