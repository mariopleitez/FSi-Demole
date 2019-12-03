import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, Nav, Tabs, Tab, LoadingController, NavController, App } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { LoginProvider } from '../../providers/login/login';
import { PerfilPage } from './../perfil/perfil';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
  userId: string;
  getName: string;
  authdata: any;

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Noticias', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'home' },
    { title: 'Donar', pageName: 'TabsPage', tabComponent: 'Tab2Page', index: 1, icon: 'card' },
    { title: 'Ayuda', pageName: 'AyudaPage', icon: 'help-buoy' },
    { title: 'Cuenta', pageName: 'PerfilPage', icon: 'shuffle'}
    // { title: 'Special', pageName: 'SpecialPage', icon: 'shuffle' }
  ];

  url: string = "https://fundasierra.org/terminos-y-condiciones/";

  constructor(public _app: App, public navCtrl: NavController, public localStorage: Storage,  private login:LoginProvider, public loadingCtrl: LoadingController, private fb: Facebook, private googlePlus: GooglePlus, private inAppBrowser: InAppBrowser) {

        this.localStorage.get('user').then((value) => {
            this.userId = value;
            if(this.userId){
              this.login.isAuthenticated = "Logout";
              this.localStorage.get('name').then((val) => {
                this.getName = val;
                this.login.getName = val;
              });
            }else{
              this.login.isAuthenticated = "Login";
              this.login.getName = undefined;
            }
        });
       
       console.log(this.localStorage.get('name'));
  }



  openLoginPage(){
    this.localStorage.get('user').then((value) => {
        this.userId = value;
        if(this.userId){
            this.localStorage.remove('user').then(() => {

              let loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });

              loading.present();

              setTimeout(() => {

                if(this.login.getAuthData.provider){
                  if(this.login.getAuthData.provider == "facebook"){
                    this.fb.logout()
                    .then( res => {
                      console.log(res);
                    } )
                    .catch(e => console.log('Error logout from Facebook', e));
                  }else if(this.login.getAuthData.provider == "google"){
                    this.googlePlus.logout()
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => console.error(err));
                  }
                }

                loading.dismiss();
                this.login.isAuthenticated      = "Login";
                this.login.getName              = undefined;
                this.login.getAuthData.name     = undefined;
                this.login.getAuthData.image    = undefined;
                this.login.getAuthData.email    = undefined;
                this.login.getAuthData.provider = undefined;
                this._app.getRootNav().popToRoot();
              }, 300);
          });
        }else{
           this.nav.push(LoginPage);
        }
    });

  }

   openWebpage(){

     const options: InAppBrowserOptions = {
       zoom: 'no'

     }
     const browser = this.inAppBrowser.create(this.url, '_self', options);
     // browser.on('')
   }

    openPage(menuItem: PageInterface) {
      const childNavs: any[] = this.nav.getActiveChildNavs();
      const childTabNav: Tabs = childNavs.find(({viewCtrl}) => (viewCtrl && viewCtrl.id === menuItem.pageName));
      if (childTabNav && (typeof menuItem.index !== 'undefined')) {
        childTabNav.select(menuItem.index);
      } else {
        if(menuItem.pageName === 'PerfilPage'){
            if ( this.login.isAuthenticated === "Login") {
              this.navCtrl.push(LoginPage, {"next": PerfilPage })
            }else{
              this.nav.push(PerfilPage);
            }
        }else{
            this.nav.setRoot(menuItem.pageName, {tabIndex: menuItem.index});  
        }
      }
    }


    public isActive(page: PageInterface) {
        const childTabsNav: any[] = this.nav.getActiveChildNavs();

        const selectedTab: Tab = childTabsNav.length && childTabsNav[0].getSelected && childTabsNav[0].getSelected();

        if (childTabsNav.length && typeof page.tabComponent !== 'undefined') {
          if (selectedTab && selectedTab.root && selectedTab.root === page.tabComponent) {
            return 'primary';
          }
          return;
        }


        const activeNav = this.nav.getActive();

        if (activeNav && activeNav.name && activeNav.name === page.pageName) {
          return 'primary';
        }

        return;
    }
}
