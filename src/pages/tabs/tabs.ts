import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ApproveuserPage } from '../approveuser/approveuser';
import { MorePage } from '../more/more';
import { Notifications3Page } from '../notifications3/notifications3';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  platformList: string = '';
  isApp: boolean = true;
  userId: any;
  public loadedDescList: Array<any>;
  badgeCount: any;
  isAdmin: boolean = false;
  public descList:Array<any>;
  public descList2:Array<any>;
  public descRef: firebase.database.Reference;
  public descRef2: firebase.database.Reference;

  public pendRef: firebase.database.Reference;
  public pendList: Array<any>;


  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ApproveuserPage;
  tab5Root = MorePage;
  tab6Root = Notifications3Page;

  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase) {

      this.userId = firebase.auth().currentUser.uid;


    this.descRef = firebase.database().ref('/users-list');

this.descRef.on('value', descList => {
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

  this.descList = descs5;
  this.isAdmin = temp;

});

this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs2 = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);


     if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy == this.userId) {
      descs2.push(weeklyData);
     }


  return false;
  });

  this.descList2 = descs2;

});


if (this.descList2 === undefined)
 this.descList2 = [];


this.pendRef = firebase.database().ref('/users-pending');

this.pendRef.on('value', descList => {
  let descs9 = [];
  descList.forEach( desc => {
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    descs9.push(weeklyData);

  return false;
  });

  this.pendList = descs9;
});

if (this.pendList === undefined)
 this.pendList = [];
  

  } //end constructor


}
