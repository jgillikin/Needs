import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Need } from './../../models/need/need';
import { NotificationsPage } from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Toast } from '@ionic-native/toast';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  platformList: string = '';
  public communityId: any;
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public needRef: firebase.database.Reference;
  public reqCell: any;
  public userRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  public needList: Array<any>;
  public badgeCount: any;
  public shoppingList2: firebase.database.Reference;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController, public platform: Platform,public db: AngularFireDatabase,private toast: Toast,
public modalCtrl: ModalController) {

this.userId = firebase.auth().currentUser.uid;

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

this.needRef = firebase.database().ref('/needs');

this.needRef.on('value', descList => {
  let descs2 = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    
   if (weeklyData["record"].status == 'Requested' || weeklyData["record"].status == 'InProgress' || weeklyData["record"].status == 'WorkCompleted'  ) {
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


/* this.size$ = new BehaviorSubject(null);


 this.items$ = this.size$.switchMap(count =>
      db.list('/needs', ref =>
        count ? ref.orderByChild('count').equalTo('1') : ref
      ).valueChanges()
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

 // this.reqName = descs4;
  this.reqCell = descs5;
});


  } //end constructor

ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(nd2: Need, commId: any) {

//alert("in onSave and commId is "+commId);

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

if (!commId || !nd2.clientId || !nd2.desc) {

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


 this.nd.push({
 "clientId": nd2.clientId,
 "desc": nd2.desc,
 "dateSub": today,
 "status": 'NEW',
 "advocate": this.userId,
 "advocateCell": this.reqCell,
 "dateComp": '',
 "notes": '',
 "communityId": commId
});

this.navCtrl.setRoot(HomePage);

}

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

onChange(clientId) {

//this.shoppingList2 = firebase.database().ref('/clients/'+clientId);

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
//alert(descs[0].record.community);
this.communityId = descs[0].record.community;

  //this.descList = descs;
  this.loadedDescList = descs;
});


}

openModal() {
    let myModal = this.modalCtrl.create(NotificationsPage);
    myModal.present();
  }



}
