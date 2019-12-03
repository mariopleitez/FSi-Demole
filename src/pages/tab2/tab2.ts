import { PostProvider } from './../../providers/post/post';
import { PaymentsProvider } from './../../providers/payments/payments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { SelectSearchableComponent } from 'ionic-select-searchable';


/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Port {
  public id: number;
  public name: string;
}


@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})

export class Tab2Page {
  post: any;
  newSubscription: any;
  current_year: any;
  planes: any;
  singlePayment: boolean;
  currencies = ['EUR', 'USD'];
  payment = {};
  ports: Port[];
  port: Port;
  page = 1;
  totalPage = 0;
  nexturl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public paymentProvider:PaymentsProvider, public postsProvider: PostProvider) {
    this.current_year = new Date().getFullYear();
    this.newSubscription = {};
    this.getPlans();
    this.newSubscription.singlePayment = false;
    this.getPosts();
    // this.ports = [
    //         { id: 1, name: 'Bistro vegetariano en Nueva Guadalupe' },
    //         { id: 2, name: 'Bistro vegetariano en Nueva Guadalupe Bistro vegetariano en Nueva Guadalupe' },
    //         { id: 3, name: 'Bistro vegetariano en Nueva Guadalupe Bistro vegetariano en Nueva Guadalupe Bistro vegetariano en Nueva Guadalupe' }
    //     ];
  }

  getPosts(){
    this.postsProvider.getPosts(null)
    .then(data => {
      this.ports = data['data']['data'];
      this.nexturl = data["data"]["next_page_url"];
      this.totalPage = data["data"]["last_page"];

    });
  }


  getMorePorts(event: {
      component: IonicSelectableComponent,
      infiniteScroll: InfiniteScroll,
      text: string
    })
  {
    // let text = (event.text || '').trim().toLowerCase();
    this.page = this.page + 1;
    this.postsProvider.getPosts(this.nexturl)
    .then(data => {
    //console.log(data['data']['data']);
    for (var i = 0; i < data["data"]["data"].length; i++) {
    this.ports.push(data["data"]["data"][i]);
    }
    this.nexturl = data["data"]["next_page_url"];
    event.infiniteScroll.complete();
    //InfiniteScroll.complete();
    });


    // There're no more ports - disable infinite scroll.
    // if (this.page > 3) {
    //   event.infiniteScroll.enable(false);
    //   return;
    // }

    // this.portService.getPortsAsync(this.page, 15).subscribe(ports => {
    //   ports = event.component.items.concat(ports);

    //   if (text) {
    //     ports = this.filterPorts(ports, text);
    //   }

    //   event.component.items = ports;
    //   event.infiniteScroll.complete();
    //   this.page++;
    // });
  }


  filterPorts(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1
      // return port.name.toLowerCase().indexOf(text) !== -1 ||
      //   port.country.name.toLowerCase().indexOf(text) !== -1;
    });
  }


  portChange(event: { component: IonicSelectableComponent, value: any }) {
     console.log('port:', event.value);
  }

  makePayment() {

  }

  getPlans(){
    this.paymentProvider.getPlans()
        .then(data => {
             this.planes = data['data'];
       });
  }

  placeDonation(){

  }


}
