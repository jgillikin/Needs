import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { NotificationsPage } from '../notifications/notifications';
import { AllopenPage } from '../allopen/allopen';
import { AllclosedPage } from '../allclosed/allclosed';
import { SearchopenPage } from '../searchopen/searchopen';
import { SearchclosedPage } from '../searchclosed/searchclosed';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  platformList: string = '';
  isApp: boolean = true;
  shoppingList: any;
  communityId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;


  constructor(public navCtrl: NavController,public platform: Platform,public db: AngularFireDatabase) {

   this.shoppingList = [
        'All Open Needs',
        'Open Needs by Community',
        'All Closed Needs',
        'Closed Needs by Community'
     ];

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
//  this.loadedDescList = descs;
});


  } //end constructor

goNot() {
//alert("in goNot");
this.navCtrl.push(NotificationsPage);
}

onChange(comId) {
//alert("comId to search for is "+comId);

this.navCtrl.setRoot(SearchopenPage, {
    comPassed: comId
   })

}

onChange2(comId) {
//alert("comId to search for is "+comId);

this.navCtrl.setRoot(SearchclosedPage, {
    comPassed: comId
   })

}


open1 () {
this.navCtrl.push(AllopenPage);
}

open3 () {
this.navCtrl.push(AllclosedPage);
}



}
