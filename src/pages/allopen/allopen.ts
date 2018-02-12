import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Community } from './../../models/community/community';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'page-allopen',
  templateUrl: 'allopen.html'
})
export class AllopenPage {

  platformList: string = '';
  isApp: boolean = true;
  community = {} as Community;
  com: AngularFireList<any> = this.db.list('/communities');
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  nd: AngularFireList<any> = this.db.list('/needs');
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  ul: AngularFireList<any> = this.db.list('/users-list');
  public needRef: firebase.database.Reference;
  public reqName: any;
  public reqCell: any;
  public userRef: firebase.database.Reference;
  userId: any;

  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase) {

      this.userId = firebase.auth().currentUser.uid;

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
 
    if (weeklyData["record"].status == 'NEW')
     descs.push(weeklyData);

  return false;
  });


  this.descList = descs;
  this.loadedDescList = descs;
});

/*this.size$ = new BehaviorSubject(null);

this.items$ = this.size$.switchMap(size =>
     db.list('/needs', ref =>
       status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
     ).snapshotChanges()
   );
*/


this.userRef = firebase.database().ref('/users-list');

this.userRef.on('value', descList => {
  let descs4 = '';
  let descs5 = '';
 
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();

    if (weeklyData["record"].uid == this.userId) {
     descs4=weeklyData["record"].fname+' '+weeklyData["record"].lname;
     descs5=weeklyData["record"].cell;
    }

  return false;
  });

  this.reqName = descs4;
  this.reqCell = descs5;
});



  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(com2: Community) {

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


 this.com.push({
 "name": com2.name,
 "zip": com2.zip,
 "addedBy": this.userId,
  "dateAdded": today
});

this.navCtrl.setRoot(HomePage);

}

requestItem(item) {

  let notes: any;

//  alert("items is "+this.items$.)


  item.status = 'Requested';

  //edit to Firebase
  this.nd.update(item.id, { status: 'Requested'});
  this.nd.update(item.id, { reqBy: this.userId });
  this.nd.update(item.id, { reqName: this.reqName });
  this.nd.update(item.id, { reqCell: this.reqCell });

  this.navCtrl.setRoot(HomePage);

}

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}


}
