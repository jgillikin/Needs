import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Newuser } from './../../models/newuser/newuser';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'page-approveuser',
  templateUrl: 'approveuser.html'
})
export class ApproveuserPage {

  newuser = {} as Newuser;
  nu: AngularFireList<any> = this.db.list('/users-pending');
  userId: any;
  platformList: string = '';
  isApp: boolean = true;

  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;

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
  this.loadedDescList = descs;
});


  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.push(NotificationsPage);
}



}
