import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListcommunityPage } from '../listcommunity/listcommunity';
import { ManageclientsPage } from '../manageclients/manageclients';
import { ManageneedsPage } from '../manageneeds/manageneeds'
import { NotificationsPage } from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  public needRef: firebase.database.Reference;
  public needList: Array<any>;



  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {

/*    this.size$ = new BehaviorSubject(null);

   this.items$ = this.size$.switchMap(size =>
         db.list('/needs', ref =>
           status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
         ).snapshotChanges()
       );*/

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



  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.setRoot(NotificationsPage);
}

open1 () {
this.navCtrl.push(ListcommunityPage);
}

open2 () {
this.navCtrl.push(ManageclientsPage);
}

open4 () {
this.navCtrl.push(ManageneedsPage);
}

}
