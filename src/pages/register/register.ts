import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Newuser } from './../../models/newuser/newuser';
import { LoginPage } from '../login/login';
import { SMS } from '@ionic-native/sms';


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


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,
private sms: SMS) {

      let platforms = this.platform.platforms();

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
  this.loadedDescList = descs;
});




  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(nu2: Newuser) {


//alert("in onSave and fname is "+nu2.fname+" and lname is "+nu2.lname+" and cell is "+nu2.cell+" and community is "+nu2.defaultCom);

this.sms.send('7572865248','Hello Jason');


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
 "dateAdded": today
}); 

this.navCtrl.setRoot(LoginPage);

}

}