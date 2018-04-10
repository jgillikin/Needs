import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Newuser } from './../../models/newuser/newuser';
import { NotificationsPage } from '../notifications/notifications';
import { ApproveusereditPage} from '../approveuseredit/approveuseredit';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-approveuser',
  templateUrl: 'approveuser.html'
})
export class ApproveuserPage {

  newuser = {} as Newuser;
//  nu: AngularFireList<any> = this.db.list('/users-pending');
  userId: any;
  platformList: string = '';
  isApp: boolean = true;
  isAdmin: boolean = false;
  public descRef2: firebase.database.Reference;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  public needRef: firebase.database.Reference;
  public needList: Array<any>;


  constructor(public navCtrl: NavController,public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase,public modalCtrl: ModalController) {

this.userId = firebase.auth().currentUser.uid;

  let platforms = this.platform.platforms();

        this.platformList = platforms.join(', ');

     if (this.platform.is('core') ||                	     	this.platform.is('mobileweb')) {
     this.isApp = false;
      }



this.descRef = firebase.database().ref('/users-pending');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    descs.push(weeklyData);
  return false;
  });

  //alert(descs[0].id);

  this.descList = descs;
});

/*this.size$ = new BehaviorSubject(null);

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

});


this.needRef = firebase.database().ref('/needs');

this.needRef.on('value', descList => {
  let descs2 = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    
        if (this.isAdmin) {
    
   if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate === this.userId) {
   // alert(weeklyData["record"].desc);
    descs2.push(weeklyData);
   }

   if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy === this.userId) {
//    alert(weeklyData["record"].desc);
    descs2.push(weeklyData);
   }
    
   if (weeklyData["record"].status == 'WorkCompleted' && weeklyData["record"].advocate === this.userId) {
  //   alert(weeklyData["record"].desc);
     descs2.push(weeklyData);
   }


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

//alert("needList size is "+this.needList.length);
if (this.needList === undefined)
 this.needList = [];


  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

open1(fname,lname,cell,defCom,key,email,password) {

//alert("pass email "+email+ "and password"+password);

this.navCtrl.push(ApproveusereditPage, {
      firstPassed: fname,
      secondPassed: lname,
      thirdPassed: cell,
      fourthPassed: defCom,
      fifthPassed: key,
      sixthPassed: email,
      seventhPassed: password
      });

}

openModal() {
    let myModal = this.modalCtrl.create(NotificationsPage);
    myModal.present();
  }


}
