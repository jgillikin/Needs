import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListcommunityPage } from '../listcommunity/listcommunity';
import { NotificationsPage } from '../notifications/notifications';


@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

 


  constructor(public navCtrl: NavController) {


  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.push(NotificationsPage);
}

open1 () {
this.navCtrl.push(ListcommunityPage);
}

}
