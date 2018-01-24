import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListcommunityPage } from '../listcommunity/listcommunity';


@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

 


  constructor(public navCtrl: NavController) {


  } //end constructor

open1 () {
this.navCtrl.push(ListcommunityPage);
}

}
