import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RequestsPage } from '../requests/requests';
import { Need } from './../../models/need/need';
import {Http, Request, RequestMethod, Headers} from "@angular/http";
//import { NotificationsPage } from './notifications';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  platformList: string = '';
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  userId: any;
  public descList:Array<any>;
  public descList2:Array<any>;
  public descList3:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  http: Http;
  data: any = {};


pushPage: any;

section
groceries

constructor(public navCtrl: NavController,
public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase,http: Http) {

this.http = http;


this.pushPage = HomePage;

this.section = "one";

let platforms = this.platform.platforms();

        this.platformList = platforms.join(', ');

     if (this.platform.is('core') ||                	     	this.platform.is('mobileweb')) {
     this.isApp = false;
      }


  this.groceries = [
            'Requests',
            'In Progress',
            'Work Finished'
        ];

  this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs = [];
  let descs2 = [];
  let descs3 = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    if (weeklyData["record"].status == 'Requested')
     descs.push(weeklyData);

     if (weeklyData["record"].status == 'InProgress')
      descs2.push(weeklyData);

      if (weeklyData["record"].status == 'WorkCompleted')
       descs3.push(weeklyData);

  return false;
  });

 //alert(descs[0].id);

  this.descList = descs;
  this.descList2 = descs2;
  this.descList3 = descs3;

//  this.loadedDescList = descs;
});


  } //end constructor

  editItem1(item) {

  this.nd.update(item.id, { status: 'InProgress' });

  let sendEmail = '7572865248@messaging.sprintpcs.com';

  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Status set to In Progress for Need:  "'+item.record.desc+'"'});


  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });


  this.navCtrl.setRoot(NotificationsPage);

  }

  rejectItem1(item) {

  this.nd.update(item.id, { status: 'NEW',reqBy: '' });

  this.navCtrl.setRoot(NotificationsPage);

  }

  editItem2(item) {

  this.nd.update(item.id, { status: 'WorkCompleted' });

  let sendEmail = '7572865248@messaging.sprintpcs.com';

  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Status set to Work Completed for Need:  "'+item.record.desc+'"'});


  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });


  this.navCtrl.setRoot(NotificationsPage);

  }

  rejectItem2(item) {

  this.nd.update(item.id, { status: 'Requested' });

  this.navCtrl.setRoot(NotificationsPage);

  }

  editItem3(item) {

  this.nd.update(item.id, { status: 'CLOSED' });

  let sendEmail = '7572865248@messaging.sprintpcs.com';

  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Status set to CLOSED for Need:  "'+item.record.desc+'"'});


  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });


  this.navCtrl.setRoot(NotificationsPage);

  }

  rejectItem3(item) {

  this.nd.update(item.id, { status: 'InProgress' });

  this.navCtrl.setRoot(NotificationsPage);

  }

logout(){
//alert("in logout");
    this.afA.auth.signOut().then(() => {
       this.navCtrl.push(LoginPage);
    })
}

  page1: any = RequestsPage;
/*  page2: any = InprogressPage;
  page3: any = WorkfinishedPage; */


}
