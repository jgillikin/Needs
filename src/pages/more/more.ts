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



  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {

    this.size$ = new BehaviorSubject(null);

   this.items$ = this.size$.switchMap(size =>
         db.list('/needs', ref =>
           status ? ref.orderByChild('dateSub').equalTo('NEW') : ref
         ).snapshotChanges()
       );


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
