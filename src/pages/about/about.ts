import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Client } from './../../models/client/client';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  platformList: string = '';
  isApp: boolean = true;
  client = {} as Client;
  clt: AngularFireList<any> = this.db.list('/clients');
  userId: any;


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase) {

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}





  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(cl2: Client) {

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

let today:any = new Date();
let dd:any = today.getDate();
let mm:any = today.getMonth()+1; //January is 0!

let yyyy:any = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;


 this.clt.push({
 "fname": cl2.fname,
 "lname": cl2.lname,
 "cell": cl2.cell,
 "community": cl2.community,
 "addedBy": this.userId,
 "dateAdded": today
}); 

this.navCtrl.setRoot(TabsPage);

}

}