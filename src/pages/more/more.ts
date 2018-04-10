import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListcommunityPage } from '../listcommunity/listcommunity';
import { ManageclientsPage } from '../manageclients/manageclients';
import { ManageneedsPage } from '../manageneeds/manageneeds'
import { ManageusersPage } from '../manageusers/manageusers'
import { NotificationsPage } from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CreedPage } from '../creed/creed';
import {App} from 'ionic-angular';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  public needRef: firebase.database.Reference;
  public descRef2: firebase.database.Reference;
  public needList: Array<any>;
  public allRef: firebase.database.Reference;
  public allList: Array<any>;
  isAllAdmin: boolean = false;
  userId: any;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController,public db: AngularFireDatabase,public modalCtrl: ModalController,
public afA: AngularFireAuth,public app: App) {

   this.userId = firebase.auth().currentUser.uid;


/*    this.size$ = new BehaviorSubject(null);

   this.items$ = this.size$.switchMap(size =>
         db.list('/needs', ref =>
           status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
         ).snapshotChanges()
       );*/

this.descRef2 = firebase.database().ref('/users-list');

this.descRef2.on('value', descList => {
  let temp = false; 
  let descs5 = [];
 
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();

//alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);

    if (weeklyData["record"].uid == this.userId) {
     descs5.push(weeklyData);

     if (weeklyData["record"].type == 'A')
      temp = true;
     else
      temp = false;

    }

  return false;
  });

//  this.descList = descs5;
  this.isAdmin = temp;

this.needRef = firebase.database().ref('/needs');

this.needRef.on('value', descList => {
  let descs2 = [];
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);

if (this.isAdmin) {
    
   if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === this.userId)
    descs2.push(weeklyData);

   if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === this.userId)
    descs2.push(weeklyData);
    
   if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === this.userId)
     descs2.push(weeklyData);


}
else {

   if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === this.userId)
     descs2.push(weeklyData);


}
    

  return false;
  });

//alert(descs[0].id);

  this.needList = descs2;
  //this.loadedDescList = descs;
});


});




//alert("needList size is "+this.needList.length);
if (this.needList === undefined)
 this.needList = [];

this.allRef = firebase.database().ref('/users-list');

this.allRef.on('value', descList => {
  let descs3 = [];
  let temp: boolean = false;
  let temp2: boolean = false;

  descList.forEach( desc => {
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    
   if (weeklyData["record"].uid == this.userId && weeklyData["record"].alladmin == '1' && weeklyData["record"].type == 'A') {
     descs3.push(weeklyData);
     temp = true;
//alert("setting to true and uid is "+this.userId+" and alladmin is "+weeklyData["record"].alladmin+" "+weeklyData["record"].cell);
//     return true;   
   }

   if(weeklyData["record"].uid == this.userId && weeklyData["record"].type == 'A') {
    temp2 = true;
    //return true;
   }

  return false;
  });

//alert(descs[0].id);
  this.isAllAdmin = temp;
  this.isAdmin = temp2;
  this.allList = descs3;
});


  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

open1 () {
this.navCtrl.push(ListcommunityPage);
}

open2 () {
this.navCtrl.push(ManageclientsPage);
}

open4 () {
this.navCtrl.push(ManageneedsPage);
}

open5 () {
this.navCtrl.push(ManageusersPage);
}


openModal() {
    let myModal = this.modalCtrl.create(NotificationsPage);
    myModal.present();
  }

showAbout() {
    let myModal = this.modalCtrl.create(CreedPage);
    myModal.present();
}

logOff(){
//alert("in logout");

  /*  this.afA.auth.signOut().then(() => {
  
      this.navCtrl.setRoot(LoginPage);
       //this.app.getRootNav().setRoot(LoginPage);
    }); */

    var user = this.afA.auth.signOut();
    this.app.getRootNav().setRoot(LoginPage); // Better way to fix this line?

}


}
