import { PaymentsProvider } from './../../providers/payments/payments';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-deep-donate',
  templateUrl: 'deep-donate.html',
})
export class DeepDonatePage {

  post: any;
  newSubscription: any;
  current_year: any;
  planes: any;
  singlePayment: boolean;
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, private paymentProvider: PaymentsProvider, public alertCtrl: AlertController) {
    this.current_year = new Date().getFullYear();
    this.newSubscription = {};
    this.post = this.navParams.get("post");
    this.getPlans();
    this.newSubscription.singlePayment = false;
    //console.log(this.post);

    this.localStorage.get('user').then((value) => {
      this.userId = value;
    });

    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      //console.log(tabs);
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } 
    
  }

  //  ionViewWillEnter() {
  //   console.log("aca");
  //   let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //     console.log(tabs);
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

  getPlans(){
    this.paymentProvider.getPlans()
        .then(data => {
             this.planes = data['data'];
       });
  }

  placeDonation(){

    if (!(this.newSubscription.number && this.newSubscription.exp && this.newSubscription.cvc) ||
         (this.newSubscription.singlePayment && !this.newSubscription.amount) ||
         (!this.newSubscription.singlePayment && !this.newSubscription.subscription)
        ){

      this.alertCtrl
        .create({ title: "Error", message: "Complete todos los campos del formulario", buttons: ['OK']})
        .present();
        return;
    }

    this.paymentProvider.doPayment(this.newSubscription, this.userId)
         .then(data => {
             this.alertCtrl
              .create({ title: "Gracias por realizar la donación", message: data["stripe_plan"], buttons: [{
                  text: 'Ok'
              }]})
             .present();
       })
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


  }
}
