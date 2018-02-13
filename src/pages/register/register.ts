import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Newuser } from './../../models/newuser/newuser';
import { LoginPage } from '../login/login';
import {Http, Request, RequestMethod, Headers} from "@angular/http";
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  platformList: string = '';
  isApp: boolean = true;
  newuser = {} as Newuser;
  nu: AngularFireList<any> = this.db.list('/users-pending');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  http: Http;
  data: any = {};


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,
http: Http, private toast: Toast) {

      let platforms = this.platform.platforms();

      this.http = http;

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/communities');

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
 // this.loadedDescList = descs;
});




  } //end constructor


onSave(nu2: Newuser) {

//alert("in onSave and fname is "+nu2.fname+" and lname is "+nu2.lname+" and cell is "+nu2.cell+" and community is "+nu2.defaultCom);

if (nu2.cell.length < 10) {

if (this.platform.is('android') || this.platform.is('ios')  || this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please enter 10 digit number`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else {
alert('Please enter 10 digit number');
return false;
}


}

if (!nu2.fname || !nu2.lname || !nu2.cell || !nu2.email || !nu2.password || !nu2.defaultCom) {

if (this.platform.is('android') || this.platform.is('ios')  || this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please fill in all fields`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else {
alert('Please fill in all fields');
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


 this.nu.push({
 "fname": nu2.fname,
 "lname": nu2.lname,
 "email": nu2.email,
 "cell": nu2.cell,
 "defaultCom": nu2.defaultCom,
 "password": nu2.password,
 "dateAdded": today
});

let sendEmail = '7572865248@messaging.sprintpcs.com';

//send SMS
var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
var myData;
var message;
myData = JSON.stringify({emailS: 'New Needs User request:  '+nu2.fname+' '+nu2.lname});


this.http.post(link,myData)
.subscribe(data => {
this.data.response = "OK";
}, error => {
console.log("oops");
});


this.navCtrl.setRoot(LoginPage);

}

}
