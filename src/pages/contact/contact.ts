import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  shoppingList: any;

  constructor(public navCtrl: NavController) {

   this.shoppingList = [
        'All Open Needs',
        'Open Needs by Community',
        'All Closed Needs',
        'Closed Needs by Community'
     ];

  }

}
