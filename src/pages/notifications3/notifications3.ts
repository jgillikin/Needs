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
import {Http, Request, RequestMethod, Headers, URLSearchParams} from "@angular/http";
//import { NotificationsPage } from './notifications';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-notifications3',
  templateUrl: 'notifications3.html'
})
export class Notifications3Page {

  platformList: string = '';
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  ul: AngularFireList<any> = this.db.list('/users-list');
  userId: any;
  isAdmin: boolean = false;
  public descList:Array<any>;
  public descList2:Array<any>;
  public descList3:Array<any>;
  public descRef: firebase.database.Reference;
  public userRef: firebase.database.Reference;
  public descRef2: firebase.database.Reference;
  public loadedDescList: Array<any>;
  http: Http;
  data: any = {};
  public reqName: any;
  pushPage: any;
  section
  groceries

constructor(public navCtrl: NavController,
public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase,http: Http,public viewCtrl: ViewController) {


this.http = http;

this.userId = firebase.auth().currentUser.uid;

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

this.userRef = firebase.database().ref('/users-list');

this.userRef.on('value', descList => {
  let descs4 = '';
  let descs5 = [];
 
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();

    descs5.push(weeklyData);

//alert("this userId is "+this.userId+" and array uid is "+weeklyData["record"].uid);

//    if (weeklyData["record"].uid == this.userId)
     descs4=weeklyData["record"].fname+' '+weeklyData["record"].lname;    

//    desc4 = desc.val();

  return false;
  });

  //this.reqName = descs4;
  this.loadedDescList = descs5;

});



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

    if (weeklyData["record"].status == 'Requested' && weeklyData["record"].advocate == this.userId) {
     descs.push(weeklyData);
    }

     if (weeklyData["record"].status == 'InProgress' && weeklyData["record"].reqBy == this.userId) {
      descs2.push(weeklyData);
     }

      if (weeklyData["record"].status == 'WorkCompleted'  && weeklyData["record"].advocate == this.userId) {
       descs3.push(weeklyData);
      }

  return false;
  });

  this.descList = descs;
  this.descList2 = descs2;
  this.descList3 = descs3;

});

if (this.descList === undefined)
 this.descList = [];

if (this.descList2 === undefined)
 this.descList2 = [];

if (this.descList3 === undefined)
 this.descList3 = [];

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



  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}

  editItem1(item) {

  let toS: any;

  this.nd.update(item.id, { status: 'InProgress' });
  


  for (var q=0;q<this.loadedDescList.length;q++) {
   if (item.record.reqBy == this.loadedDescList[q].record.uid) {
    toS = this.loadedDescList[q].record.cell;
    break;
   }
   //alert(this.loadedDescList[q].record.email);
  }


//need to send text to requester who was approved and to Advocate for the Need

  let sendEmailReq = '7572865248@messaging.sprintpcs.com';
  toS = toS+'@messaging.sprintpcs.com';

var mmsg = 'You have been assigned Need "'+item.record.desc+'"';
mmsg = mmsg+ '.  Please contact '+item.record.advocateName+' at '+item.record.advocateCell+' for more info';


var link2='https://twiliotest-ajvlzxkjds.now.sh/login';


//alert("send to "+toS);

  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail2.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'You have been assigned Need:  "'+item.record.desc+'"', toS: toS});

let params: URLSearchParams = new URLSearchParams();
 params.set('msg', mmsg);
 params.set('mto','["1'+item.record.reqCell+'"]');

 //Http request-
 this.http.get(link2, {
   search: params
 }).subscribe(
   (response) => console.log('worked'), 
   (error) => console.log('error')
 );


/*
  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });
*/

  this.navCtrl.setRoot(Notifications3Page);

  }

  rejectItem1(item) {

  this.nd.update(item.id, { status: 'NEW',reqBy: '',reqName: '', reqCell: '' });

  this.navCtrl.setRoot(Notifications3Page);

  }

  editItem2(item) {

  let toS: any;

  //alert("item advocate uid is "+item.record.advocate);

  for (var q=0;q<this.loadedDescList.length;q++) {
   if (item.record.advocate == this.loadedDescList[q].record.uid) {
    toS = this.loadedDescList[q].record.cell;
    break;
   }
   //alert(this.loadedDescList[q].record.email);
  }

  
  this.nd.update(item.id, { status: 'WorkCompleted' });

  let sendEmail = '7572865248@messaging.sprintpcs.com';
  toS = toS+'@messaging.sprintpcs.com';

var mmsg = 'Needs work completed for Need "'+item.record.desc+'" by '+item.record.reqName+' ('+item.record.reqCell+') please close it out';


var link2='https://twiliotest-ajvlzxkjds.now.sh/login';


  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Work Completed for Need:  "'+item.record.desc+'"' +' please close it out', toS: toS});

let params: URLSearchParams = new URLSearchParams();
 params.set('msg', mmsg);
 params.set('mto','["1'+item.record.advocateCell+'"]');

 //Http request-
 this.http.get(link2, {
   search: params
 }).subscribe(
   (response) => console.log('worked'), 
   (error) => console.log('error')
 );

/*
  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });
*/


  this.navCtrl.setRoot(Notifications3Page);

  }

  rejectItem2(item) {

  this.nd.update(item.id, { status: 'Requested' });

  this.navCtrl.setRoot(Notifications3Page);

  }

  editItem3(item) {

  let toS: any;

  //alert("item advocate uid is "+item.record.advocate);

  for (var q=0;q<this.loadedDescList.length;q++) {
   if (item.record.advocate == this.loadedDescList[q].record.uid) {
    toS = this.loadedDescList[q].record.cell;
    break;
   }
   //alert(this.loadedDescList[q].record.email);
  }

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

  this.nd.update(item.id, { dateComp: today });
  this.nd.update(item.id, { status: 'CLOSED' });
  

  let sendEmail = '7572865248@messaging.sprintpcs.com';
  toS = toS+'@messaging.sprintpcs.com';

//alert("toS to send is "+toS);

  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail2.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'NeedsApp, status set to CLOSED for Need:  "'+item.record.desc+'"', toS: toS});

var mmsg = 'NeedsApp, status set to CLOSED for Need:  "'+item.record.desc+'"';


var link2='https://twiliotest-ajvlzxkjds.now.sh/login';


  //send SMS
  var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Work Completed for Need:  "'+item.record.desc+'"' +' please close it out', toS: toS});

let params: URLSearchParams = new URLSearchParams();
 params.set('msg', mmsg);
 params.set('mto','["1'+item.record.advocateCell+'"]');

 //Http request-
 this.http.get(link2, {
   search: params
 }).subscribe(
   (response) => console.log('worked'), 
   (error) => console.log('error')
 );


/*
//commented out since we dont need to send a text every time an Advocate closes out a Need

  this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });
*/

  this.navCtrl.setRoot(Notifications3Page); 

  }

  rejectItem3(item) {

  this.nd.update(item.id, { status: 'InProgress' });

  this.navCtrl.setRoot(Notifications3Page);

  }

logout(){
//alert("in logout");

/*    this.afA.auth.signOut().then(() => {
       this.navCtrl.push(LoginPage);
    }) */

this.viewCtrl.dismiss();

}

  page1: any = RequestsPage;
/*  page2: any = InprogressPage;
  page3: any = WorkfinishedPage; */


}
