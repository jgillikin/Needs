import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { NotificationsPage } from '../notifications/notifications';

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

  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.push(NotificationsPage);
}

}
