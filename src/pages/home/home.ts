import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Need } from './../../models/need/need';
import { NotificationsPage } from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  platformList: string = '';
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  public badgeCount: any;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;


  constructor(public navCtrl: NavController, public platform: Platform,public db: AngularFireDatabase) {

let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/clients');

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


onSave(nd2: Need) {

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

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


 this.nd.push({
 "clientId": nd2.clientId,
 "desc": nd2.desc,
 "dateSub": today,
 "status": 'NEW',
 "advocate": this.userId,
 "neighbor": '',
 "dateComp": '',
 "notes": ''
}); 

this.navCtrl.setRoot(HomePage);

}

goNot() {
//alert("in goNot");
this.navCtrl.push(NotificationsPage);
}

}
