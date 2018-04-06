import { Component } from '@angular/core';
import { NavController,Platform, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Newuser } from './../../models/newuser/newuser';
import { HomePage } from '../home/home';
import { ApproveuserPage } from '../approveuser/approveuser';
import { NotificationsPage } from '../notifications/notifications';
import { User } from './../../models/user/user';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Request, RequestMethod, Headers} from "@angular/http";
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-approveuseredit',
  templateUrl: 'approveuseredit.html'
})
export class ApproveusereditPage {

  platformList: string = '';
  isApp: boolean = true;
  newuser = {} as Newuser;
  nu: AngularFireList<any> = this.db.list('/users-list');
  com: AngularFireList<any> = this.db.list('/users-pending');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  public fname: any;
  public lname: any;
  public cell: any;
  public defaultCom: any;
  public key2: any;
  public email: any;
  public pass2: any;
  user = {} as User;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  http: Http;
  data: any = {};


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,public params: NavParams,private afAuth: AngularFireAuth,http: Http, private toast: Toast,private toastCtrl: ToastController) {

      this.http = http;

      this.fname = this.params.get('firstPassed');
      this.lname = this.params.get('secondPassed');
      this.cell = this.params.get('thirdPassed');
      this.defaultCom = this.params.get('fourthPassed');
      this.key2 = this.params.get('fifthPassed');
      this.email = this.params.get('sixthPassed');
      this.pass2 = this.params.get('seventhPassed');

      //alert("fname passed in is "+this.fname+" and key is "+this.key2);

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

/*
this.descRef = firebase.database().ref('/communities');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    descs.push(weeklyData);
  return false;
  });


  this.descList = descs;
});
*/

this.size$ = new BehaviorSubject(null);

this.items$ = this.size$.switchMap(size =>
     db.list('/needs', ref =>
       status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
     ).snapshotChanges()
   );


  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(typeUser: any) {

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

if (!typeUser) {

if (this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please select a user type`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else if (this.platform.is('mobileweb')) {
 let toast = this.toastCtrl.create({
    message: 'Please fill in all fields',
    duration: 2000,
    position: 'bottom'
  });

toast.present();

}
else {
alert('Please select a user type');
return false;
}

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

//officially register with Firebase
this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass2)
     .then((user) => {

       //push to users-list table
        this.nu.push({
        "fname": this.fname,
        "lname": this.lname,
        "cell": this.cell,
        "defaultCom": this.defaultCom,
        "addedBy": this.userId,
        "dateAdded": today,
        "type": typeUser,
        "email": this.email,
        "uid": user.uid
       });

       //delete need to delete from users-pending
       this.com.remove(this.key2).then(_ => console.log('deleted!'));

       //send SMS to notify user
       let sendEmail = this.cell+'@messaging.sprintpcs.com';

//alert("sendEmail is "+sendEmail);

       //send SMS
       var link='https://jasongillikin.000webhostapp.com/blueEmail2.php';
       var myData;
       var message;
       myData = JSON.stringify({emailS: 'Your Needs account has been activiated', toS: sendEmail});


       this.http.post(link,myData)
       .subscribe(data => {
       this.data.response = "OK";
       }, error => {
       console.log("oops");
       });


       this.navCtrl.setRoot(HomePage);

     })
.catch((error) => this.handleError(error) );

}

reject () {
//  alert("in reject");
  this.com.remove(this.key2).then(_ => console.log('deleted!'));
  this.navCtrl.setRoot(ApproveuserPage);
}

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

onChange(com: any) {
//alert("search for "+com);
}

// If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    //this.notify.update(error.message, 'error');
  }

}
