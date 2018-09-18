import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Client } from './../../models/client/client';
import { HomePage } from '../home/home';
import { NotificationsPage } from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Toast } from '@ionic-native/toast';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {App} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  platformList: string = '';
  isApp: boolean = true;
  client = {} as Client;
  isAdmin: boolean = false;
  public descRef2: firebase.database.Reference;
  clt: AngularFireList<any> = this.db.list('/clients');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  public needRef: firebase.database.Reference;
  public needList: Array<any>;


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,private toast: Toast,public modalCtrl: ModalController,private toastCtrl: ToastController,public app: App) {

this.userId = firebase.auth().currentUser.uid;


      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;

       /* this.size$ = new BehaviorSubject(null);

       this.items$ = this.size$.switchMap(size =>
             db.list('/needs', ref =>
               status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
             ).snapshotChanges()
           ); */

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
  //this.loadedDescList = descs;
});

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


onSave(cl2: Client) {

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

if (!cl2.fname || !cl2.lname || !cl2.cell || !cl2.community) {

if (this.platform.is('tablet') || this.platform.is('ipad') ) {
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
    position: 'bottom'
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


 this.clt.push({
 "fname": cl2.fname,
 "lname": cl2.lname,
 "cell": cl2.cell,
 "community": cl2.community,
 "addedBy": this.userId,
 "dateAdded": today
});

if (this.platform.is('mobileweb')) {
 let toast2 = this.toastCtrl.create({
    message: 'Client added',
    duration: 2000,
    position: 'bottom'
  });

toast2.present();

}


this.navCtrl.setRoot(HomePage);

}

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

onChange(com: any) {
//alert("search for "+com);
}

openModal() {
    let myModal = this.modalCtrl.create(NotificationsPage);
    myModal.present();
  }


}
