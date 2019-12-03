import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe } from '@ionic-native/stripe';


@Injectable()
export class PaymentsProvider {

  url:string;
  headers: any;
  key: any;
  card: any;
  amount: any;
  singlePayment: number = 0;
  token: string;


  constructor(private http: HttpClient, public localStorage: Storage, public alertCtrl: AlertController, private stripe: Stripe, private loadingCtrl: LoadingController) {
    // this.stripe.setPublishableKey('pk_test_gXS59VpbIQyBbE2LVZ1hzK3x')
    this.stripe.setPublishableKey('pk_live_VOaka4U0PHx5jbeF4JhzCYTi')

    this.localStorage.get('user').then((value) => {
      this.key = value;
    });
  }


  setLikes(postParams) {
    this.url= "http://34.202.156.31/api/likes";
    
    //console.log(this.key);

    if(this.key == undefined){
        this.localStorage.get('user').then((value) => {
          this.key = value;
        });
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(postParams), {headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.key).set('Content-Type', 'application/json')})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err.error.message);
            // this.alertCtrl
            // .create({ title: "Error", message: err.error.message, buttons: [{
            //     text: 'Ok'
            // }]})
            // .present();
        });
    });
  }


  getPlans(){
      this.url= "http://34.202.156.31/api/getplans";
      return new Promise(resolve => {
          this.http.get(this.url).subscribe(data => {
              resolve(data);
          }, err => {
             console.log(err);
          });
      });
  }



  // getToken(postParams){

  //   this.stripe.createCardToken(card)
  //       .then(token => this.token = token.id)
  //       .catch(error => {
  //           if(error.error.message){
  //             this.alertCtrl
  //             .create({ title: "Error", message: error.error.message, buttons: [{
  //                 text: 'Ok'
  //             }]})
  //             .present();
  //           }else{
  //                 this.alertCtrl
  //                 .create({ title: "Error", message: "No usamos cordova", buttons: [{
  //                     text: 'Ok'
  //                 }]})
  //                 .present();
  //           }
  //       });
  // }

  doPayment(postParams, Bearer) {

    


    this.url= "http://34.202.156.31/api/subscribe";

    var expiracion = postParams.exp.split("-");
    let card = {
        number: postParams.number,
        expMonth: expiracion[1],
        expYear: expiracion[0],
        cvc:  postParams.cvc
    };


    if(postParams.singlePayment){
        this.singlePayment = 1;
        if (postParams.amount.indexOf('.') > -1){
           this.amount = postParams.amount.replace(".", "");
           this.amount.replace(",","");
        }else{
           this.amount = parseInt(postParams.amount) + '00';
        }
    }


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return new Promise((resolve, reject) => {
      this.stripe.createCardToken(card)
      .then(
            token => {
                  this.http.post(this.url, JSON.stringify({
                    stripeToken: token.id,
                    stripeEmail: "contacto@fundasierra.org",
                    amount:this.amount,
                    singlePayment: this.singlePayment,
                    plan: postParams.subscription
                  }), {headers: new HttpHeaders().set('Authorization', 'Bearer '+ Bearer).set('Content-Type', 'application/json')})
                    .subscribe(res => {
                      loading.dismiss();
                      resolve(res);
                    }, (err) => {
                          loading.dismiss();
                          if(err.error.message){
                                  this.alertCtrl
                                  .create({ title: "Error", message: err.error.message, buttons: [{
                                      text: 'Ok'
                                  }]})
                                  .present();
                          }else{
                                  this.alertCtrl
                                  .create({ title: "Error", message: "Ha habido un error en la operación.", buttons: [{
                                      text: 'Ok'
                                  }]})
                                .present();
                          }
                    });
            }
        )
        .catch(error => {
                  this.alertCtrl
                  .create({ title: "Error", message: error.error.message, buttons: [{
                      text: 'Ok'
                  }]})
                  .present();
                loading.dismiss();
        });

    });


  }

}
