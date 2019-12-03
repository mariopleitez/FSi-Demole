import { Tab1Page } from './../tab1/tab1';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  @ViewChild(Slides) slides: Slides;

  sliderIndex:any;
  slider: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sliderIndex = 0;
    this.slider = [
      {
        title: "¡Hola!",
        description: "<b>Bienvenido a</b><img src='assets/imgs/LogoTipologia.png' class='mini-slide-img'/>la aplicación de FSI para el desarrollo solidario.",
        image: "assets/imgs/FSI-01b.png",
      },
      {
        title: "Donar",
        description: "Desde la opción <b>\"donar\"</b> puedes aportar al trabajo permanente de la fundación o a los proyectos de “crowdfunding” de nuestros socios",
        image: "assets/imgs/FSI-02a.png",
      },
      {
        title: "Embajador FSI",
        description: "A medida que más participes, tu perfil y reconocimiento aumentará, pudiendo llegar a ser un embajador FSI.",
        image: "assets/imgs/FSI-03a.png",
      },
      {
        title: "Noticias",
        description: "Desde la sección <b>\"noticias\"</b> puedes seguir de cerca las iniciativas e involucrarte aún más.",
        image: "assets/imgs/FSI-04b.png",
      }
    ];
  }


  goToSlide() {
    this.slides.slideTo(this.sliderIndex, 100);
    console.log("si viene");
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.sliderIndex = currentIndex;
    console.log('Current index is', currentIndex);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');
  }

  gotoPosts(){
    this.navCtrl.push(Tab1Page);
  }

}
