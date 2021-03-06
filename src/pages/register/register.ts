import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Newuser } from './../../models/newuser/newuser';
import { LoginPage } from '../login/login';
import {Http, Request, RequestMethod, Headers, URLSearchParams,RequestOptions} from "@angular/http";
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';

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
http: Http, private toast: Toast,private toastCtrl: ToastController) {

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

if (!nu2.cell || nu2.cell.length < 10) {

if (this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please enter 10 digit number`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else if (this.platform.is('mobileweb')) {
 let toast = this.toastCtrl.create({
    message: 'Please enter 10 digit number',
    duration: 2000,
    position: 'bottom'
  });

toast.present();

}
else {
alert('Please enter 10 digit number');
return false;
}


}

if (!nu2.fname || !nu2.lname || !nu2.email || !nu2.password || !nu2.defaultCom) {

if (this.platform.is('android') || this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please fill in all fields`, '3000', 'center').subscribe(
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
    position: 'top'
  });

toast.present();

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

//let cellMod = nu2.cell.replace(/-/g,"");
let cellMod = nu2.cell.replace(/[()\-\s]+/g, '');

 this.nu.push({
 "fname": nu2.fname,
 "lname": nu2.lname,
 "email": nu2.email,
 "cell": cellMod,
 "defaultCom": nu2.defaultCom,
 "password": nu2.password,
 "dateAdded": today
});

let sendEmail = '7572865248@messaging.sprintpcs.com';

//send SMS
var link='https://jasongillikin.000webhostapp.com/blueEmail.php';
var mmsg = 'New Needs User request from '+nu2.fname+' '+nu2.lname;
//alert("mmsg is "+mmsg);

//var link2='https://till-node-demo-iizbwqdopi.now.sh/login';
//var link2='https://twiliotest-ajvlzxkjds.now.sh/login';
var link2='https://warm-particle.glitch.me/login';

//linked to palomas gmail in Till
//alert(link2);

//twilio on Zeit with palomas email
var link3='http://needstwilio-twilioneeds.a3c1.starter-us-west-1.openshiftapps.com:3000/login';

var myData,myData2;
var message;
myData = JSON.stringify({emailS: 'New Needs User request:  '+nu2.fname+' '+nu2.lname});
myData2 = JSON.stringify({msg: 'New Needs User request:  '+nu2.fname+' '+nu2.lname});

let params: URLSearchParams = new URLSearchParams();
 params.set('msg', mmsg);
 params.set('mto','["17572865248"]');

 //Http request-
 this.http.get(link2, {
   search: params
 }).subscribe(
   (response) => console.log('worked'), 
   (error) => console.log('error')
 );

/*
this.http.post(link2,myData2)
.subscribe(data => {
this.data.response = "OK";
}, error => {
console.log("oops");
});
*/


this.navCtrl.setRoot(LoginPage);

}

}
