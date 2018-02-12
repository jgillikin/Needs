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
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  public needRef: firebase.database.Reference;
  public needList: Array<any>;


  constructor(public navCtrl: NavController,public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase) {

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

this.needRef = firebase.database().ref('/needs');

this.needRef.on('value', descList => {
  let descs2 = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    
   if (weeklyData["record"].status == 'Requested' || weeklyData["record"].status == 'InProgress' || weeklyData["record"].status == 'WorkCompleted'  ) {
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

}
